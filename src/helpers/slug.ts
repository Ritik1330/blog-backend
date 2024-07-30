export const slugBuilder = async (e: string): Promise<string> => {
  let tempSlug = await e.replace(
    /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
    "",
  );
  tempSlug = await tempSlug.replace(/ /g, "-").toLowerCase();

  return tempSlug;
};
