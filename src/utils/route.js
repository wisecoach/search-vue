export function removeId(path) {
  const splits = path.split("/")
  let newSplits = []
  for (let split of splits) {
    if (isNaN(Number(split)) && split !== "" && !split.startsWith(":")) {
      newSplits.push(split)
    }
  }
  const newPath = "/" + newSplits.join("/")
  return newPath;
}
