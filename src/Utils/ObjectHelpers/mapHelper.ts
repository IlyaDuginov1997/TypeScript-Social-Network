export const mapHelper = (items: any[], itemId: number, objPropsName: string, newObjProps: Object) => {
  return items.map(u => {
    return u[objPropsName] === itemId
      ? { ...u, ...newObjProps }
      : u;
  });
};
