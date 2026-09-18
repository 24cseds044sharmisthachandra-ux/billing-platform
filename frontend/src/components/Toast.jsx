export default function Toast({ message, error }) { return message ? <div className={error ? 'toast error' : 'toast'}>{message}</div> : null; }
