export const getDynamicPath = (route: string, params: Record<string, string | number>) => {
    let path = route;
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value));
    });
    return path;
  };