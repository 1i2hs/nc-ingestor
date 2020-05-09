import { Injectable } from '@nestjs/common';
import { UrlData } from './url_data.interface';

@Injectable()
export class QueueComponent {
  private queue: Array<UrlData> = [];

  enqueue(urlData: UrlData | Array<UrlData>): void {
    if (Array.isArray(urlData)) {
      this.queue = this.queue.concat(urlData);
    } else {
      this.queue.push(urlData);
    }
  }

  dequeue(): UrlData | undefined {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }
  }

  clear(): void {
    this.queue = [];
  }

  find(id: string): UrlData | undefined {
    return this.queue.find((urlData: UrlData) => urlData.id === id);
  }

  all(): Array<UrlData> {
    return this.queue;
  }
}
