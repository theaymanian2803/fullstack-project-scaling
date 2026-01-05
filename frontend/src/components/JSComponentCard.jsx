import React, { useState } from 'react'
import { useSelector } from 'react-redux' // Added to access auth state
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Terminal, Eye, Code, FileText, AlertCircle, Trash2 } from 'lucide-react'
import { useDeleteComponentMutation } from '../slices/componentSlice'
import { toast } from 'react-toastify'

export default function JSComponentCard({ item }) {
  const [activeTab, setActiveTab] = useState('code')
  const [copied, setCopied] = useState(false)

  // 1. ACCESS AUTH STATE & MUTATION
  const { userInfo } = useSelector((state) => state.auth)
  const [deleteComponent, { isLoading: isDeleting }] = useDeleteComponentMutation()

  const isPreviewable = item.filename.endsWith('.jsx') || item.filename.endsWith('.html')

  // 2. DELETE HANDLER
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        await deleteComponent(item._id).unwrap()
        toast.success('Component deleted successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCleanHTML = (rawCode) => {
    if (!rawCode) return ''
    return rawCode
      .trim()
      .replace(/^[`"]+|[`"]+$/g, '')
      .replace(/\.trim\(\)$/g, '')
      .replace(/className=/g, 'class=')
  }

  return (
    <div className="w-full bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl mb-16 transition-all hover:border-orange-500/30">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#181818] border-b border-[#222]">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-orange-600" />
          <span className="text-white font-bold text-xs tracking-widest uppercase">
            {item.name}
          </span>
        </div>

        {/* 3. ADMIN ONLY DELETE BUTTON */}
        {userInfo && userInfo.isAdmin && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-500 hover:text-red-500 transition-colors p-1"
            title="Delete Component">
            <Trash2 size={18} className={isDeleting ? 'animate-pulse' : ''} />
          </button>
        )}
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#141414]">
        <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
              activeTab === 'code'
                ? 'bg-[#252525] text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-300'
            }`}>
            <Code size={14} /> Code
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-[#252525] text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-300'
            }`}>
            <Eye size={14} /> Preview
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
              activeTab === 'info'
                ? 'bg-[#252525] text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-300'
            }`}>
            <FileText size={14} /> Info
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-all active:scale-95">
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'COPIED' : 'COPY CODE'}
        </button>
      </div>

      {/* VIEWPORT AREA */}
      <div className="relative min-h-[450px] bg-black">
        {activeTab === 'code' && (
          <div className="p-2 overflow-auto max-h-[600px]">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{ background: 'transparent', padding: '2rem', fontSize: '13px' }}
              showLineNumbers={true}>
              {item.code}
            </SyntaxHighlighter>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="w-full min-h-[500px] bg-white rounded-b-2xl flex justify-center items-center overflow-x-auto">
            {isPreviewable ? (
              <div
                className="w-full h-full min-w-[320px]"
                dangerouslySetInnerHTML={{ __html: getCleanHTML(item.code) }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 text-center p-8">
                <AlertCircle size={48} className="text-orange-600 opacity-50" />
                <p className="uppercase tracking-widest text-[10px] font-black">
                  Preview Unavailable
                </p>
                <p className="text-xs text-gray-500">Logic files (.js/.ts) cannot be rendered</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-[450px]">
            <h4 className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
              Documentation
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic italic">
              "{item.description}"
            </p>
            <div className="pt-6 border-t border-white/5 w-full max-w-xs text-gray-600 text-[9px] uppercase font-bold tracking-widest font-mono">
              FILE: {item.filename}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
