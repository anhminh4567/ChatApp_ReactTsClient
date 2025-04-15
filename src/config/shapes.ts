import {
  asscher,
  cushion,
  emerald,
  heart,
  marquise,
  oval,
  pear,
  princess,
  radiant,
  round,
} from "@/assets/icons/diamondShapes";
const SHAPES: { Name: string; Img: string | React.ReactNode; Id: number }[] = [
  {
    Name: "Round",
    Img: round,
    Id: 1,
  },
  {
    Name: "Ascher",
    Img: asscher,
    Id: 8,
  },
  {
    Name: "Princess",
    Img: princess,
    Id: 3,
  },
  {
    Name: "Emerald",
    Img: emerald,
    Id: 5,
  },
  {
    Name: "Oval",
    Img: oval,
    Id: 6,
  },
  {
    Name: "Radiant",
    Img: radiant,
    Id: 7,
  },
  {
    Name: "Pear",
    Img: pear,
    Id: 2,
  },
  {
    Name: "Cushion",
    Img: cushion,
    Id: 4,
  },
  {
    Name: "Heart",
    Img: heart,
    Id: 10,
  },
  {
    Name: "Marquise",
    Img: marquise,
    Id: 9,
  },
];
export default SHAPES;
