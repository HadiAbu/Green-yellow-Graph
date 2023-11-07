export type Node = {
  id: string;
  color: string;
  fontColor: string;
  size: number;
  fontSize: number;
  x?: number; //x coordinates
  y?: number; //y coordinates
};
export type Link = {
  source: string;
  target: string;
};
export interface DataProps {
  nodes: Array<Node>;
  links: Array<Link>;
}
export interface Props {
  data?: DataProps | undefined;
}
