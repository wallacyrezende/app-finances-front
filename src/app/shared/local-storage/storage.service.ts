import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor() { }

    getItem(key: string): any {
        let item = localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }

    setItem(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
     }
}