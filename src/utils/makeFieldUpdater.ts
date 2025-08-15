// utils/makeFieldUpdater.ts
export function makeFieldUpdater<T extends object>(
  instance: { update: (data: Partial<T>) => void },
  path: string
) {
  return (value: any) => {
    const keys = path.split(".");
    const updateObj: any = {};
    let current = updateObj;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current[key] = {};
        current = current[key];
      }
    });

    // 깊은 병합(기존 객체 유지)
    instance.update(deepMerge(instance, updateObj));
  };
}

// 깊은 병합 함수
function deepMerge<T extends object>(source: any, updateObj: any): Partial<T> {
  const result: any = { ...source };
  for (const key in updateObj) {
    if (
      typeof updateObj[key] === "object" &&
      updateObj[key] !== null &&
      !Array.isArray(updateObj[key])
    ) {
      result[key] = deepMerge(result[key] || {}, updateObj[key]);
    } else {
      result[key] = updateObj[key];
    }
  }
  return result;
}
