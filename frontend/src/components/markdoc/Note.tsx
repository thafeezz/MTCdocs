type NoteProps= {
  children: any;
  title: string;
};

const Note = ({ children, title }:NoteProps) => {
  return (
    <div className="bg-slate-800/40 border-l-4 border-red-600 rounded-r-lg p-4 my-6">
      <div className="font-medium text-blue-400 mb-2">{title}</div>
      <div className="text-offwhite">{children}</div>
    </div>
  );
};

export default Note;

