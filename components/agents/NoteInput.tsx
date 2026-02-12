"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, StickyNote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NoteInputProps {
  notes: string[];
  onAdd: (note: string) => void;
  onRemove: (index: number) => void;
  title?: string;
}

export function NoteInput({ notes, onAdd, onRemove, title = "Notes" }: NoteInputProps) {
  const [newNote, setNewNote] = useState("");
  const handleAdd = () => { if (newNote.trim()) { onAdd(newNote.trim()); setNewNote(""); } };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-yellow-500" /> {title}
          </CardTitle>
          <span className="text-xs text-muted-foreground">{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-1.5">
          <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd(); } }} placeholder="Add a note..." rows={2} className="flex-1 px-3 py-2 text-xs rounded-md bg-muted border focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
          <Button size="sm" variant="secondary" className="h-auto px-2 self-end" onClick={handleAdd} disabled={!newNote.trim()}>
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-1.5">
          <AnimatePresence>
            {notes.map((note, i) => (
              <motion.div key={`${i}-${note.slice(0, 20)}`} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="flex items-start gap-2 group p-2 rounded-md bg-muted/50 border">
                <p className="flex-1 text-xs whitespace-pre-wrap">{note}</p>
                <button onClick={() => onRemove(i)} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {notes.length === 0 && <p className="text-xs text-muted-foreground text-center py-3">No notes yet</p>}
      </CardContent>
    </Card>
  );
}
