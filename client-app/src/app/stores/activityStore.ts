import { observable, action, computed, runInAction } from 'mobx';
import { IActivity } from '../model/activity';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable activityRegisty = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable editMode = false;
    @observable submitting = false;  
    @observable target = '';
    
    @computed get activitiesByDate() {
        return Array.from(this.activityRegisty.values()).sort((a,b) => Date.parse(a) - Date.parse(b));
    }

    @action loadActivities = async () => {
        try {
            this.loadingInitial = true;
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split('.')[0];                
                this.activityRegisty.set(activity.id, activity);
            });
            this.loadingInitial = false;
        }   catch (error) {
            console.log(error);
        } 
    }       

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegisty.get(id);
    }

    @action setEditMode = (editMode: boolean) => {
        this.editMode = editMode;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            this.activityRegisty.set(activity.id, activity);
            this.editMode = true;
            this.submitting = false;
        }
        catch (error) {
            console.log(error);
        }
    }

    @action editActivity = async (activity: IActivity) => { 
        try {
            this.submitting = true;
            await agent.Activities.update(activity);
            this.activityRegisty.set(activity.id, activity);      
            this.activity = activity;
            this.editMode = false;
            this.submitting = false;
        }
        catch (error) {
            console.log(error);
        }
    }

    @action deleteActivity = async (event:SyntheticEvent<HTMLButtonElement>, id: string) => { 
        try {
            this.target = event.currentTarget.name;
            this.submitting = true;
            await agent.Activities.delete(id);
            this.activityRegisty.delete(id);      
            this.activity = null;            
            this.submitting = false;
        }
        catch (error) {
            console.log(error);
        }
    }

    @action loadActivity = async (id: string) => {        
        let activity = this.activityRegisty.get(id);
        if (activity) {
            this.activity = activity;
        } else {
            try {
                this.loadingInitial = true;
                this.activity = await agent.Activities.details(id);
                this.loadingInitial = false;                
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);                
            }
        }        
    }

    @action clearActivity = () => {
        this.activity = null;
    }        
}

export default createContext(new ActivityStore());