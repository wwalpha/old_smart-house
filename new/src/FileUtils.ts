
export const resolveLocalFileURL = (path: string): Promise<Entry> => new Promise((resolve, reject) => {
  window.resolveLocalFileSystemURL(path, (entry: Entry) => resolve(entry), (error: FileError) => reject(error),
  );
});

export const dirEntries = (reader: DirectoryReader): Promise<Entry[]> => new Promise((resolve, reject) => {
  reader.readEntries((entries: Entry[]) => resolve(entries), (error: FileError) => reject(error));
});

export const dirList = async (path: string): Promise<Entry[]> => {
  const entry: Entry = await resolveLocalFileURL(path);

  if (entry.isFile) {
    return [];
  }

  const dirEntry: DirectoryEntry = entry as DirectoryEntry;

  return await dirEntries(dirEntry.createReader());
};
