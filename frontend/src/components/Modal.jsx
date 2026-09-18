import { X } from 'lucide-react';
export default function Modal({ title, children, onClose }) { return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><div className="eyebrow">Edit workspace</div><h2>{title}</h2></div><button className="close-btn" onClick={onClose}><X size={18}/></button></div>{children}</div></div>; }
