import { Tweet, Media, Type, Variant } from '../interfaces/Tweet';

export const isVideo = (media: Media) =>
  media.type === Type.AnimatedGif || media.type === Type.Video;

export const isPhoto = (media: Media) => media.type === Type.Photo;

export const isContentTypeVideo = (variant: Variant) =>
  variant.content_type.includes('video/mp4');

export const isMedia = (content: Tweet) =>
  !!content.entities.media &&
  content.entities.media?.every((media) => isPhoto(media));

export function getStatusURL(content: Tweet) {
  const media = content.entities.media?.slice().pop();
  if (media) {
    return media.expanded_url;
  }

  return undefined;
}

export function hasVideo(content: Tweet): boolean {
  const hasVideoMedia =
    !!content.extended_entities &&
    content.extended_entities?.media.some((media) => isVideo(media));

  return hasVideoMedia;
}

export function getVideoUrl(content: Tweet) {
  const mediaFound = content.extended_entities?.media.find((media) =>
    isVideo(media)
  );

  if (mediaFound) {
    const variantFound = mediaFound.video_info?.variants.find((variant) =>
      isContentTypeVideo(variant)
    );
    if (variantFound) {
      return variantFound.url;
    }
  }

  return undefined;
}

export function filterMediaOnly(content: Tweet[]) {
  return content.filter((contentToFilter) => isMedia(contentToFilter));
}
