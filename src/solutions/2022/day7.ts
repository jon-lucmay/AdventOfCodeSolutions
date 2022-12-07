export const day7 = (arrayOfData: string[]) => {
  let total1 = 0;

  class file {
    name: string;
    filesize: number;
    parent?: directory | undefined;

    constructor(
      name: string,
      filesize: number,
      parent: directory | undefined = undefined
    ) {
      this.name = name;
      this.filesize = filesize;
      if (parent) {
        this.parent = parent;
      }
    }
  }

  class directory {
    name: string;
    contents: (file | directory)[];
    parent?: directory | undefined;
    size = 0;

    constructor(
      name: string,
      contents: file[],
      parent: directory | undefined = undefined
    ) {
      this.name = name;
      this.contents = contents;
      if (parent) {
        this.parent = parent;
      }
    }
  }

  const root = new directory('/', []);

  let currentDirectory = root;

  arrayOfData.forEach(line => {
    if (line.slice(0, 4) === '$ cd') {
      const target = line.split(' ')[2];
      if (target === '..') {
        if (currentDirectory.parent) {
          currentDirectory = currentDirectory.parent;
        }
      } else if (target === '/') {
        currentDirectory = root;
      } else {
        const child = currentDirectory.contents.find(
          directory => directory.name === target
        );
        if (child instanceof directory) {
          currentDirectory = child;
        }
      }
    }
    // ls parse
    if (line.slice(0, 3) === 'dir') {
      const target = line.split(' ')[1];
      if (
        !currentDirectory.contents.find(directory => directory.name === target)
      ) {
        currentDirectory.contents.push(
          new directory(target, [], currentDirectory)
        );
      }
    }
    if (parseInt(line[0]) >= 0) {
      const ls = line.split(' ');
      const target = ls[1];
      const filesize = ls[0];
      if (!currentDirectory.contents.find(file => file.name === target)) {
        currentDirectory.contents.push(
          new file(target, parseInt(filesize), currentDirectory)
        );
      }
    }
  });

  const computeSize = (targetDirectory: directory) => {
    let size = 0;
    targetDirectory.contents.forEach(thing => {
      if (thing instanceof file) {
        size += thing.filesize;
      } else if (thing instanceof directory) {
        size += computeSize(thing);
      }
    });
    if (size <= 100000) {
      total1 += size;
    }
    targetDirectory.size = size;
    return size;
  };

  root.contents.forEach(file => {
    if (file instanceof directory) {
      computeSize(file);
    }
  });

  root.contents.forEach(thing => {
    if (thing instanceof directory) {
      root.size += thing.size;
    } else if (thing instanceof file) {
      root.size += thing.filesize;
    }
  });

  const freeSpace = 70000000 - root.size;

  const neededSpace = 30000000 - freeSpace;

  const biggerDirectories: directory[] = [];

  const findSizeableDirectories = (dir: directory) => {
    dir.contents.forEach(thing => {
      if (thing instanceof directory) {
        if (thing.size >= neededSpace) {
          biggerDirectories.push(thing);
        } else {
          //nothing
        }
        thing.contents.forEach(child => {
          if (child instanceof directory) {
            findSizeableDirectories(child);
          }
        });
      }
    });
  };

  findSizeableDirectories(root);

  biggerDirectories.sort((a, b) => {
    return a.size - b.size;
  });

  console.log('part1: ' + total1);
  console.log('part2: ' + biggerDirectories[0].size);
};
