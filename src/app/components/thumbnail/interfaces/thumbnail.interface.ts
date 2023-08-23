
export declare interface ImageDescription {
    primary?: string;
    secondary?: string;
    overlay?: string;
}

export declare interface ImagesDetails {
    thumbnailSrc: string;
    fullImageSrc: string;
    alt: string;
    title?: string;
    description?: ImageDescription;
}
