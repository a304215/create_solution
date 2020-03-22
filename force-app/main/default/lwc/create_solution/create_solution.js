import { LightningElement,track,wire } from 'lwc';
import get_solution from '@salesforce/apex/create_solution_class.get_solution';
import get_solution_item  from '@salesforce/apex/create_solution_class.get_solution_item';
export default class Create_solution extends LightningElement {
    @track solution_item = [];
    @track select_solution_div = true;
    @track select_value;
    @track solution_detail_item = [];
    @track new_solution_detail_item = [];
    @track get_item_div = false;
    @track be_delete_item = [];
    @wire(get_solution)
    wiredAccounts({ error, data }) {
        if (data) {
            this.solution_item = data;
        } else if (error) {
            this.error = error;
        }
    }
    get options() {
        const return_list = [];
        for(let i = 0 ; i < this.solution_item.length;i++){
            return_list[i] = {
                label :this.solution_item[i].Solution__c,
                value:this.solution_item[i].Solution__c
            }
        }
        return return_list;
    }
    handleChange(event){
        this.select_value = event.detail.value;
        
    }
    get_select_value(event){
        get_solution_item({solution:this.select_value})
        .then(result=>{
            this.get_item_div = false;
            this.solution_detail_item = []
            console.log(result);
            for(let i =0 ; i < result.length;i++){
                this.solution_detail_item[i] = {
                    SNO : result[i].SNO__c.toString(),
                    SolutionID : result[i].SolutionID__c,
                    FoodName : result[i].FoodName__c,
                    Id : result[i].Id,
                }
            }
            this.get_item_div = true
        }).catch(error =>{
            console.log(error)
        })
    }
    delete_the_item(event){
        var delete_name;
        var count = 0;
        delete_name = event.target.name;
        console.log(delete_name);
        this.get_item_div = false;
        for(let i = 0 ; i < this.solution_detail_item.length ; i++){
            if(this.solution_detail_item[i].Id != delete_name){
                this.new_solution_detail_item[count] = {
                    SNO : this.solution_detail_item[i].SNO,
                    SolutionID : this.solution_detail_item[i].SolutionID,
                    FoodName : this.solution_detail_item[i].FoodName,
                    Id : this.solution_detail_item[i].Id
                }
                count+=1;
            }
        }
        this.solution_detail_item = [];
        this.solution_detail_item = this.new_solution_detail_item;
        this.get_item_div = true;
    }
}