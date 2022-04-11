export interface ActiveImgProps
  extends React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
  > {
  src: string;
  alt: string;
}
