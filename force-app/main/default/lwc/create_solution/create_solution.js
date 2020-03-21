import { LightningElement,track,wire } from 'lwc';
import get_solution from '@salesforce/apex/create_solution_class.get_solution'
export default class Create_solution extends LightningElement {
    @track solution_item = [];
    @track select_solution_div = true;
    @track select_value;
    @wire(get_solution)
    wiredAccounts({ error, data }) {
        if (data) {
            this.solution_item = data;
            console.log(this.solution_item);
        } else if (error) {
            console.log(error);
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
        console.log(return_list);
        return return_list;
    }
    get_select_value(event){
        this.select_solution_div = false;
        console.log(this.select_value)
    }
    handleChange(event) {
        this.select_value = event.detail.value;
    }
}