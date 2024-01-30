export class PathCorrection {
 static urlCorrection = (url: string): string => {
    const urlParts = url.split('/');
    return urlParts.slice(3).join('/');
    
  };
}
