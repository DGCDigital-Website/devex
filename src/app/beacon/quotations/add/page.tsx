"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import { createQuotation } from "@/lib/beacon/actions";
import { QUOTATION_STATUSES, DGC_SERVICES, COUNTRIES } from "@/lib/beacon/types";
import type { BeaconUser, LineItem } from "@/lib/beacon/types";
import { createClient } from "@/utils/supabase/client";
import { ClipboardList, User, Package, Loader2, ArrowLeft, AlertCircle, Plus, Trash2, Hash } from "lucide-react";

const INPUT_CLS="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all";
const SELECT_CLS="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all appearance-none";
function Field({label,required,children,hint}:{label:string;required?:boolean;children:React.ReactNode;hint?:string}){return(<div className="space-y-1.5"><label className="block text-gray-700 text-sm font-medium">{label}{required&&<span className="text-red-400 ml-0.5">*</span>}</label>{children}{hint&&<p className="text-gray-400 text-xs">{hint}</p>}</div>);}
function genQId(){const year=new Date().getFullYear();const rand=Math.floor(1000+Math.random()*9000);return`Q-${year}-${rand}`;}
function fmtKES(n:number){return new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",minimumFractionDigits:0}).format(n);}

export default function AddQuotationPage(){
  const router=useRouter();
  const [user,setUser]=useState<BeaconUser|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);

  const [form,setForm]=useState({
    id:genQId(),name:"",company:"",company_email:"",contact:"",address:"",country:"Kenya",
    service:DGC_SERVICES[0],issued_date:new Date().toISOString().split("T")[0],
    valid_until:"",quotation_status:"Draft" as string,discount_percent:0,
  });
  const [lineItems,setLineItems]=useState<LineItem[]>([{id:"1",item:"",description:"",cost:0,qty:1}]);

  useEffect(()=>{
    createClient().auth.getUser().then(({data})=>{
      if(data.user)setUser({email:data.user.email??"",id:data.user.id});
      else router.push("/beacon/login");
    });
  },[router]);

  const subtotal=lineItems.reduce((s,li)=>s+li.cost*li.qty,0);
  const discountAmt=subtotal*(form.discount_percent/100);
  const taxable=subtotal-discountAmt;
  const taxAmt=taxable*0.16;
  const total=taxable+taxAmt;

  function updateItem(id:string,field:keyof LineItem,value:string|number){setLineItems(items=>items.map(item=>item.id===id?{...item,[field]:value}:item));}
  function addItem(){setLineItems(items=>[...items,{id:String(Date.now()),item:"",description:"",cost:0,qty:1}]);}
  function removeItem(id:string){setLineItems(items=>items.filter(i=>i.id!==id));}
  const update=useCallback((field:string,value:string|number)=>{setForm(f=>({...f,[field]:value}));},[]);

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    if(lineItems.length===0){setError("Add at least one line item.");return;}
    setLoading(true);setError(null);
    const result=await createQuotation({
      ...form,discount_amount:discountAmt,subtotal,tax_amount:taxAmt,total,balance:String(total),
      avatar:null,avatar_color:null,
      line_items:lineItems,
    });
    setLoading(false);
    if(result.error){setError(result.error);return;}
    router.push("/beacon/quotations");router.refresh();
  }

  if(!user)return null;

  return(
    <BeaconShell user={user} title="New Quotation">
      <div className="max-w-3xl">
        <Link href="/beacon/quotations" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"><ArrowLeft className="w-4 h-4"/>Back to Quotations</Link>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quotation meta */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center"><ClipboardList className="w-3.5 h-3.5 text-dgc-blue-1"/></div>
              <h2 className="text-gray-800 font-semibold text-sm">Quotation Details</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Quotation ID" required>
                <div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/><input type="text" required value={form.id} onChange={e=>update("id",e.target.value)} className={`${INPUT_CLS} pl-8 font-mono`}/></div>
              </Field>
              <Field label="Issue Date" required><input type="date" required value={form.issued_date} onChange={e=>update("issued_date",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Valid Until" required><input type="date" required value={form.valid_until} onChange={e=>update("valid_until",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Service" required><select value={form.service} onChange={e=>update("service",e.target.value)} className={SELECT_CLS}>{DGC_SERVICES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
              <Field label="Status"><select value={form.quotation_status} onChange={e=>update("quotation_status",e.target.value)} className={SELECT_CLS}>{QUOTATION_STATUSES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
            </div>
          </div>

          {/* Client */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center"><User className="w-3.5 h-3.5 text-violet-600"/></div>
              <h2 className="text-gray-800 font-semibold text-sm">Client Information</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Client Name" required><input type="text" required placeholder="Dr. Jane Mwangi" value={form.name} onChange={e=>update("name",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Organisation" required><input type="text" required placeholder="UNHCR Kenya" value={form.company} onChange={e=>update("company",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Email" required><input type="email" required value={form.company_email} onChange={e=>update("company_email",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Phone" required><input type="tel" required value={form.contact} onChange={e=>update("contact",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Address"><input type="text" value={form.address} onChange={e=>update("address",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Country" required><select value={form.country} onChange={e=>update("country",e.target.value)} className={SELECT_CLS}>{COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            </div>
          </div>

          {/* Line items */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center"><Package className="w-3.5 h-3.5 text-amber-600"/></div><h2 className="text-gray-800 font-semibold text-sm">Line Items</h2></div>
              <button type="button" onClick={addItem} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-dgc-blue-1 bg-dgc-blue-1/10 hover:bg-dgc-blue-1/20 transition-colors"><Plus className="w-3.5 h-3.5"/>Add Item</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50/80 border-b border-gray-100">{["Item","Description","Rate (KES)","Qty","Total",""].map(h=><th key={h} className="text-left text-gray-400 font-medium text-[11px] uppercase tracking-wide px-4 py-3">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {lineItems.map(li=>(
                    <tr key={li.id}>
                      <td className="px-4 py-2"><input type="text" placeholder="Service name" value={li.item} onChange={e=>updateItem(li.id,"item",e.target.value)} className="w-36 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all"/></td>
                      <td className="px-4 py-2"><input type="text" placeholder="Details…" value={li.description} onChange={e=>updateItem(li.id,"description",e.target.value)} className="w-48 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all"/></td>
                      <td className="px-4 py-2"><input type="number" min={0} value={li.cost} onChange={e=>updateItem(li.id,"cost",Number(e.target.value))} className="w-28 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all"/></td>
                      <td className="px-4 py-2"><input type="number" min={1} value={li.qty} onChange={e=>updateItem(li.id,"qty",Number(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-center focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all"/></td>
                      <td className="px-4 py-2 tabular-nums text-gray-700 text-xs font-medium whitespace-nowrap">{fmtKES(li.cost*li.qty)}</td>
                      <td className="px-4 py-2"><button type="button" onClick={()=>removeItem(li.id)} disabled={lineItems.length===1} className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><Trash2 className="w-3.5 h-3.5"/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-5 border-t border-gray-100">
              <div className="ml-auto max-w-xs space-y-2.5">
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span className="tabular-nums font-medium">{fmtKES(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-600 items-center">
                  <div className="flex items-center gap-2"><span>Discount</span><input type="number" min={0} max={100} value={form.discount_percent} onChange={e=>update("discount_percent",Number(e.target.value))} className="w-14 text-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1"/><span className="text-gray-400">%</span></div>
                  <span className="tabular-nums font-medium text-red-500">-{fmtKES(discountAmt)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600"><span>VAT (16%)</span><span className="tabular-nums font-medium">{fmtKES(taxAmt)}</span></div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200"><span>Total</span><span className="tabular-nums text-dgc-blue-1">{fmtKES(total)}</span></div>
              </div>
            </div>
          </div>

          {error&&<div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3"><AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0"/><p className="text-red-600 text-sm">{error}</p></div>}
          <div className="flex items-center gap-3 pb-4">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] disabled:opacity-60 disabled:shadow-none transition-all" style={{background:"linear-gradient(135deg,#3D9DD9,#177DA6)"}}>
              {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Creating…</>:"Create Quotation"}
            </button>
            <Link href="/beacon/quotations" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </BeaconShell>
  );
}
