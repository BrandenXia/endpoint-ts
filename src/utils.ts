export type StrMap = Record<string, unknown>;

export const buildPath = (path: string, pathParam?: StrMap) => {
  if (!pathParam) return path;

  let newPath = path;
  for (const [key, value] of Object.entries(pathParam))
    if (value) newPath = newPath.replace(`{${key}}`, value as string);

  return newPath;
};
