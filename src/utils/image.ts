// Switch to Not Found Image if the image URL of the poster is N/A.
export const verifyPoster = (content: any): string =>
  content.Poster !== "N/A" && content?.Poster
    ? content.Poster
    : `${process.env.PUBLIC_URL}/noImageFound.png`;
