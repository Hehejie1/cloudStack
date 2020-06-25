class Storage{
    constructor(){
        this.db = window.localStorage
        this.Checklists = {
            "oneself" : [],
            "family" : [],
            "job" : [],
            "date" : []
        }
        this.journal = {
            "oneself" : [],
            "family" : [],
            "job" : [],
            "date" : []
        }
        this.version = "1.0.0"
        this.checkVersion()
    }
    checkVersion(){
        if (this.db.getItem("checklists") != this.version){
            // window.localStorage.clear();
            this.save()
        }
    }
    save(){
        this.db.setItem("checklists", JSON.stringify(this.Checklists))
        this.db.setItem("journal", JSON.stringify(this.journal))
        this.db.setItem("version", JSON.stringify(this.version))
    }
    get(){
        if(this.db.getItem("checklists")){
            this.Checklists = JSON.parse(this.db.getItem("checklists"))
            this.journal = JSON.parse(this.db.getItem("journal"))
            return true
        }else{
            return false
        }
    }
    insert(name, key, value){
        if (value){
            this.Checklists[name][key].content.push(value)
        } else{
            if (key){
                if (this.journal[name].indexOf(key.id) > -1){
                    this.journal[name].splice(this.journal[name].indexOf(key.id),1)
                    this.Checklists[name][key.id] = key
                }else{
                    this.Checklists[name].push(key)
                }
            } else{
                this.Checklists = name;
            }
        }
        this.save()
    }
    update(name, key, index, value){
        if (value){
            this.Checklists[name][key].content[index] = value
        } else{
            if (index){
                this.Checklists[name][key] = index
            } else{
                if (key >= 0){
                    this.Checklists[name] = key
                } else{
                    this.Checklists = name;
                }
            }
        }
        this.save()
    }
    where(name,key,index){
        if (!this.get()){
            this.save()
        }
        if (index){
            return this.Checklists[name][key].content[index]
        } else{
            if (key >= 0){
                if (this.Checklists[name][key]){
                    return this.Checklists[name][key]
                } else{
                    this.Checklists[name][key] = []
                    return null;
                }
            } else{
                if (name){
                    return this.Checklists[name]
                } else{
                    return this.Checklists
                }
            }
        }
    }
    count(name,key){
        if (!this.get()){
            this.save()
        }
        if (key){
            return this.Checklists[name][key].content.length
        } else if (name) {
            if (this.journal[name].length){
                return this.journal[name].sort()[0]
            } else{
                return this.Checklists[name].length
            }
        }else{
            return 0
        }
    }
    delete(name,key,index){
        if (!this.get()){
            this.save()
        }
        if (index >= 0){
            this.Checklists[name][key].content.splice(index,1)
        } else if(index == -1){
            if (key >= 0){
                this.Checklists[name].splice(index,1)
            }
        }else{
            if (key >= 0){
                this.Checklists[name][key] = {
                    time : "1970-1-1T00:00:00.000Z"
                }
                this.journal[name].push(key)
            }
        }
        this.save()
        return 1
    }
}
export default new Storage()