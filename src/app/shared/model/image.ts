export interface Image {
    id: number;
    content: Uint8Array; // new Uint8Array(1024*1024*50); allocates 50MBytes
    name: string;
}
