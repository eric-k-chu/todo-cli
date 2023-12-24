#ifndef NOTEMANAGER_H
#define NOTEMANAGER_H

#include <iostream>
#include <fstream>
#include <vector>
#include <string>

struct Note {
  std::string title;
  std::string content;
};

class NoteManager {
  private:
    std::vector<Note> notes;
    const std::string filename = "notes.txt";

  public:
    NoteManager();
    void loadNotes();
    void saveNotes();
    void addNote();
    void viewNotes();
    void deleteNote();
};

#endif
