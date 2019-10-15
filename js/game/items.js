//A list of constants of item ID's.
const IID_LOG_FIR =         "log_fir";
const IID_LOG_DOUGLAS_FIR = "log_douglas_fir";

//Loads all the items into the items array.
function LoadItems(){
    items[IID_LOG_FIR] =            new Item(IID_LOG_FIR, "Fir");
    items[IID_LOG_DOUGLAS_FIR] =    new Item(IID_LOG_DOUGLAS_FIR, "Douglas Fir");
}

//The Item class contains the info and helper functions of items.
class Item{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.stackMax = 5;
    }
}

//The class for items in an inventory.
class ItemStack{
    constructor(itemID, amount){
        this.itemID = itemID;
        this.amount = amount;
    }
}

//The class that describes an inventory.
class Inventory{
    constructor(maxStacks){
        this.maxStacks = maxStacks;
        this.itemStacks = [];
    }

    //Tries to add a given itemstack to the inventory.
    addItem(itemStack){
        //First try to add the items to existing item stacks.
        this.itemStacks.forEach(tryStack => {
            if(tryStack.itemID == itemStack.itemID){
                if(tryStack.amount < items[tryStack.itemID].stackMax){
                    if(tryStack.amount + itemStack.amount <= items[tryStack.itemID].stackMax){
                        tryStack.amount += itemStack.amount;
                        return true;
                    }else{
                        var delta = items[tryStack.itemID].stackMax - tryStack.amount;
                        tryStack.amount = items[tryStack.itemID].stackMax;
                        itemStack.amount = delta;
                    }
                }
            }
        });

        //Then create a new item stack.
        if(this.itemStacks.length <= this.maxStacks){
            this.itemStacks.push(itemStack);
            return true;
        }else{
            return false;
        }
    }

    //Checks if the inventory contains an itemID
    containsItem(itemID){
        this.itemStacks.forEach(itemStack => {
            if(itemStack.itemID == itemID){
                return true;
            }
        });
        return false;
    }
}