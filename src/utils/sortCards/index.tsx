const sortCards = (a: any, b: any) => {
  if (a.id > b.id) {
    return 1;
  }
  return -1;
};
export default sortCards;
