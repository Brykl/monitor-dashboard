import { exec } from 'child_process';
import checkDiskSpace from 'check-disk-space';


interface DiskInfo {
  disk: string;
  free: string;
  total: string;
  used: string;
}

function getSystemDisks(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    exec('df -h --output=target', (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
        return;
      }
      const lines = stdout.split('\n').slice(1); 
      const disks = lines
        .map(line => line.trim())
        .filter(Boolean)
        .filter(disk => disk === '/');
      resolve(disks);
    });
  });
}

async function getDiskInfo(): Promise<DiskInfo[]> {
  try {
    const disks = await getSystemDisks();
    const diskInfo: DiskInfo[] = [];

    for (const disk of disks) {
      const diskSpace = await checkDiskSpace(disk);
      const free = (diskSpace.free / 1024 / 1024 / 1024).toFixed(2);  
      const total = (diskSpace.size / 1024 / 1024 / 1024).toFixed(2); 
      const used = (diskSpace.size - diskSpace.free) / 1024 / 1024 / 1024; 

      diskInfo.push({
        disk,
        free,
        total,
        used: used.toFixed(2),
      });
    }

    return diskInfo;
  } catch (err) {
    throw new Error('Ошибка при получении информации о дисках');
  }
}

export default getDiskInfo;
