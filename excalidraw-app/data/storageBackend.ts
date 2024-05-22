//import { SyncableExcalidrawElement } from "./firebase";
import { ExcalidrawElement, FileId } from "../../packages/excalidraw/element/types";
import { AppState, BinaryFileData } from "../../packages/excalidraw/types";
import Portal from "../collab/Portal";
import { Socket } from "socket.io-client";
import type {
  ReconciledExcalidrawElement
} from "../../packages/excalidraw/data/reconcile";

export interface StorageBackend {
  isSaved: (portal: Portal, elements: readonly ExcalidrawElement[]) => boolean;
  saveToStorageBackend: (
    portal: Portal,
    //elements: readonly ReconciledExcalidrawElement[],// SyncableExcalidrawElement[],
    elements: readonly SyncableExcalidrawElement[],
    appState: AppState,
  ) => Promise<false | { reconciledElements: any }>;
  loadFromStorageBackend: (
    roomId: string,
    roomKey: string,
    socket: Socket | null,
  ) => Promise<readonly ExcalidrawElement[] | null>;
  saveFilesToStorageBackend: ({
    prefix,
    files,
  }: {
    prefix: string;
    files: {
      id: FileId;
      buffer: Uint8Array;
    }[];
  }) => Promise<{
    savedFiles: Map<FileId, true>;
    erroredFiles: Map<FileId, true>;
  }>;
  loadFilesFromStorageBackend: (
    prefix: string,
    decryptionKey: string,
    filesIds: readonly FileId[],
  ) => Promise<{
    loadedFiles: BinaryFileData[];
    erroredFiles: Map<FileId, true>;
  }>;
}

export interface StoredScene {
  sceneVersion: number;
  iv: Uint8Array;
  ciphertext: ArrayBuffer;
}