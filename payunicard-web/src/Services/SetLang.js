/* eslint-disable no-undef */
import axios from 'axios';
import { Langs } from '../Constants/index'

class Lang  {
    constructor(){
        this.translate = {
            
        };     
        this.langKey = Langs.ENG;    
    }

events = [];



setLang = (langs) => {
    this.translate = langs;

}
getLang = (key, callback) => {
     axios.get(`http://localhost:9000/Assets/Language/${key}.json`).then(res => {
         this.translate = res.data;
         for (const e of this.events) {
             e(key);
         }
         this.langKey = key;

         if(callback) callback();
     })

}


tr =  (key) => {
    try {
        if(!key) return null;

        let parts = key.split('.');
        let value = this.translate;

        for (let part of parts) {
            value = value[part];
        }

        value = value  || '';

        return value;
    }
    catch(e) {
        return "";
    }
}


subscribe(fn) {
    this.events.push(fn);

    return {
        unsubscribe: () => {
            const index = this.events.indexOf(fn);
            if (index !== -1) this.events.splice(index, 1);
        }
    };
}
}


export default new Lang();