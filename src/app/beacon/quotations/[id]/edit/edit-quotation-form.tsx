"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import { updateQuotation } from "@/lib/beacon/actions";
import { QUOTATION_STATUSES, DGC_SERVICES, COUNTRIES } from "@/lib/beacon/types";
import type { BeaconUser, QuotationRow, LineItem } from "@/lib/beacon/types";
import { ClipboardList, User, Package, Loader2, ArrowLeft, AlertCircle, Plus, Trash2 } from "lucide-react";

const INPUT_CLS="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all";
const SELECT_CLS="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all appearance-none";
function Field({label,required,children}:{label:string;required?:boolean;children:React.ReactNode}){return(<div className="space-y-1.5"><label className="block text-gray-700 text-sm font-medium">{label}{required&&<span className="text-red-400 ml-0.5">*</span>}</label>{children}</div>);}
function fmtKES(n:number){return new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",minimumFractionDigits:0}).format(n);}

export default function EditQuotationForm({user,quotation}:{user:BeaconUser;quotation:QuotationRow}){
  const router=useRouter();
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);

  const [form,setForm]=useState({
    name:quotation.name,company:quotation.company,company_email:quotation.company_email,
    contact:quotation.contact,address:quotation.address,country:quotation.country,
    service:quotation.service,issued_date:quotation.issued_date,valid_until:quotation.valid_until,
    quotation_status:quotation.quotation_status,discount_percent:quotation.discount_percent??0,
  });
  const [lineItems,setLineItems]=useState<LineItem[]>(
    (quotation.line_items&&quotation.line_items.length>0)?quotation.line_items
    :[{id:"1",item:quotation.service,description:"",cost:quotation.subtotal??quotation.total,qty:1}]
  );

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
    e.preventDefault();setLoading(true);setError(null);
    const result=await updateQuotation(quotation.id,{
      ...form,discount_amount:discountAmt,subtotal,tax_amount:taxAmt,total,balance:String(total),
      line_items:lineItems,
    });
    setLoading(false);
    if(result.error){setError(result.error);return;}
    router.push(`/beacon/quotations/${quotation.id}/preview`);
  }

  return(
    <BeaconShell user={user} title="Edit Quotation">
      <div className="max-w-3xl">
        <Link href="/beacon/quotations" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"><ArrowLeft className="w-4 h-4"/>Back to Quotations</Link>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center"><ClipboardList className="w-3.5 h-3.5 text-dgc-blue-1"/></div><h2 className="text-gray-800 font-semibold text-sm">Quotation Details</h2></div>
              <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">{quotation.id}</span>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Issue Date" required><input type="date" required value={form.issued_date} onChange={e=>update("issued_date",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Valid Until" required><input type="date" required value={form.valid_until} onChange={e=>update("valid_until",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Status"><select value={form.quotation_status} onChange={e=>update("quotation_status",e.target.value)} className={SELECT_CLS}>{QUOTATION_STATUSES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
              <Field label="Service" required><select value={form.service} onChange={e=>update("service",e.target.value)} className={SELECT_CLS}>{DGC_SERVICES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center"><User className="w-3.5 h-3.5 text-violet-600"/></div><h2 className="text-gray-800 font-semibold text-sm">Client Information</h2></div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Client Name" required><input type="text" required value={form.name} onChange={e=>update("name",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Organisation" required><input type="text" required value={form.company} onChange={e=>update("company",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Email" required><input type="email" required value={form.company_email} onChange={e=>update("company_email",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Phone" required><input type="tel" required value={form.contact} onChange={e=>update("contact",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Address"><input type="text" value={form.address} onChange={e=>update("address",e.target.value)} className={INPUT_CLS}/></Field>
              <Field label="Country" required><select value={form.country} onChange={e=>update("country",e.target.value)} className={SELECT_CLS}>{COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            </div>
          </div>
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
                      <td className="px-4 py-2"><input type="text" value={li.item} onChange={e=>updateItem(li.id,"item",e.target.value)} className="w-36 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all"/></td>
                      <td className="px-4 py-2"><input type="text" value={li.description} onChange={e=>updateItem(li.id,"description",e.target.value)} className="w-48 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all"/></td>
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
              {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Saving…</>:"Update Quotation"}
            </button>
            <Link href="/beacon/quotations" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </BeaconShell>
  );
}
