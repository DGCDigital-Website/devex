"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import StatusBadge from "@/components/beacon/status-badge";
import ConfirmDialog from "@/components/beacon/confirm-dialog";
import { deleteQuotation } from "@/lib/beacon/actions";
import type { BeaconUser, QuotationRow } from "@/lib/beacon/types";
import { Plus, Search, Pencil, Trash2, Eye, ClipboardList, X, ChevronLeft, ChevronRight } from "lucide-react";

function formatDate(s:string){if(!s)return"—";try{return new Date(s).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}catch{return s;}}
function fmtKES(n:number|null){if(n==null)return"—";return new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",minimumFractionDigits:0}).format(n);}
const AVATAR_PALETTE=["bg-violet-100 text-violet-700","bg-sky-100 text-sky-700","bg-emerald-100 text-emerald-700","bg-amber-100 text-amber-700","bg-rose-100 text-rose-700","bg-indigo-100 text-indigo-700"];
function avatarColor(s:string){return AVATAR_PALETTE[s.charCodeAt(0)%AVATAR_PALETTE.length];}
function initials(s:string){return s.split(" ").slice(0,2).map(p=>p[0]??"").join("").toUpperCase();}
const PAGE_SIZE=15;

type Props={user:BeaconUser;quotations:QuotationRow[]};

export default function QuotationsView({user,quotations}:Props){
  const router=useRouter();
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");
  const [page,setPage]=useState(1);
  const [deleteId,setDeleteId]=useState<string|null>(null);
  const [deleting,setDeleting]=useState(false);
  const [deleteError,setDeleteError]=useState<string|null>(null);

  const filtered=useMemo(()=>{
    const q=search.toLowerCase();
    return quotations
      .filter(i=>(statusFilter==="All"||i.quotation_status===statusFilter))
      .filter(i=>!q||i.name.toLowerCase().includes(q)||i.company.toLowerCase().includes(q)||i.id.toLowerCase().includes(q));
  },[quotations,search,statusFilter]);

  const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const paginated=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);

  async function handleDelete(){
    if(!deleteId)return;
    setDeleting(true);setDeleteError(null);
    const res=await deleteQuotation(deleteId);
    setDeleting(false);
    if(res.error){setDeleteError(res.error);return;}
    setDeleteId(null);router.refresh();
  }

  const accepted=quotations.filter(q=>q.quotation_status==="Accepted").reduce((s,q)=>s+q.total,0);
  const statuses=["All","Draft","Sent","Accepted","Declined"];

  return (
    <BeaconShell user={user} title="Quotations" subtitle="Create and manage client proposals and quotations"
      actions={
        <Link href="/beacon/quotations/add" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px transition-all" style={{background:"linear-gradient(135deg,#3D9DD9,#177DA6)"}}>
          <Plus className="w-4 h-4"/>New Quotation
        </Link>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {label:"Total",value:quotations.length,sub:null,accent:"text-dgc-blue-1",bg:"bg-dgc-blue-1/10"},
          {label:"Accepted",value:fmtKES(accepted),sub:`${quotations.filter(q=>q.quotation_status==="Accepted").length} quotes`,accent:"text-emerald-600",bg:"bg-emerald-50"},
          {label:"Pending",value:quotations.filter(q=>q.quotation_status==="Sent").length,sub:"awaiting response",accent:"text-amber-600",bg:"bg-amber-50"},
          {label:"Draft",value:quotations.filter(q=>q.quotation_status==="Draft").length,sub:"unsent",accent:"text-gray-600",bg:"bg-gray-100"},
        ].map(s=>(
          <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className={`${s.bg} w-7 h-7 rounded-lg flex items-center justify-center mb-2.5`}><ClipboardList className={`w-4 h-4 ${s.accent}`}/></div>
            <p className="text-gray-400 text-[11px] font-medium">{s.label}</p>
            <p className={`text-xl font-extrabold leading-tight mt-0.5 ${s.accent}`}>{s.value}</p>
            {s.sub&&<p className="text-gray-400 text-[11px] mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
            <input type="text" placeholder="Search quotations…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} className="w-full pl-8 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all placeholder:text-gray-400"/>
            {search&&<button onClick={()=>setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-3.5 h-3.5"/></button>}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {statuses.map(s=><button key={s} onClick={()=>{setStatusFilter(s);setPage(1);}} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter===s?"bg-dgc-blue-1 text-white":"text-gray-500 hover:bg-gray-100"}`}>{s}</button>)}
          </div>
        </div>

        {deleteError&&<div className="mx-5 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{deleteError}</div>}

        {quotations.length===0?(
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4"><ClipboardList className="w-7 h-7 text-gray-300"/></div>
            <p className="text-gray-600 font-semibold">No quotations yet</p>
            <p className="text-gray-400 text-sm mt-1">Create your first client quotation.</p>
            <Link href="/beacon/quotations/add" className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{background:"linear-gradient(135deg,#3D9DD9,#177DA6)"}}>
              <Plus className="w-4 h-4"/>New Quotation
            </Link>
          </div>
        ):paginated.length===0?(
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-500 font-medium">No results</p>
            <button onClick={()=>{setSearch("");setStatusFilter("All");}} className="mt-2 text-sm text-dgc-blue-1 hover:underline">Clear filters</button>
          </div>
        ):(
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  {["Ref","Client","Service","Amount","Status","Valid Until",""].map(h=>(
                    <th key={h} className={`text-left text-gray-400 font-medium text-[11px] uppercase tracking-wide px-5 py-3.5 ${h==="Service"?"hidden sm:table-cell":""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map(q=>(
                  <tr key={q.id} className="hover:bg-gray-50/70 transition-colors duration-100 group">
                    <td className="px-5 py-3.5"><span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{q.id}</span></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${avatarColor(q.name)}`}>{initials(q.name)}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-[0.8125rem] truncate">{q.name}</p>
                          <p className="text-gray-400 text-xs truncate">{q.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-[0.8125rem] hidden sm:table-cell"><span className="truncate block max-w-[160px]">{q.service}</span></td>
                    <td className="px-5 py-3.5"><span className="font-semibold text-gray-800 tabular-nums text-[0.8125rem]">{fmtKES(q.total)}</span></td>
                    <td className="px-5 py-3.5"><StatusBadge status={q.quotation_status}/></td>
                    <td className="px-5 py-3.5 text-gray-400 text-[0.8125rem] whitespace-nowrap tabular-nums">{formatDate(q.valid_until)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/beacon/quotations/${q.id}/preview`} className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors" title="Preview"><Eye className="w-3.5 h-3.5"/></Link>
                        <Link href={`/beacon/quotations/${q.id}/edit`} className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5"/></Link>
                        <button onClick={()=>setDeleteId(q.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages>1&&(
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Page {page} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4"/></button>
              {Array.from({length:Math.min(5,totalPages)},(_,i)=>{const p=totalPages<=5?i+1:page<=3?i+1:page>=totalPages-2?totalPages-4+i:page-2+i;return <button key={p} onClick={()=>setPage(p)} className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${p===page?"bg-dgc-blue-1 text-white":"text-gray-500 hover:bg-gray-100"}`}>{p}</button>;})}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4"/></button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={deleteId!==null} onClose={()=>{setDeleteId(null);setDeleteError(null);}} onConfirm={handleDelete} loading={deleting} title="Delete quotation?" description="This quotation will be permanently deleted."/>
    </BeaconShell>
  );
}
