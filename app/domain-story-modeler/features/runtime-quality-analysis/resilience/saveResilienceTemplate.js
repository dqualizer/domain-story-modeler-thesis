import { ResilienceTemplate } from '../classes/ResilienceTemplate';

export const saveResilienceTemplate = () => {
    /**
    * Get HTML elements and their values
    */
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');
    
    let resilienceServiceAmountElement = document.getElementById('resilienceServiceAmount');
    let resilienceServiceAmountElementValue = resilienceServiceAmountElement.value;

    let timeOfServiceFailureElement = document.getElementById('timeOfServiceFailure');
    let timeOfServiceFailureElementValue = timeOfServiceFailureElement.value;

    let faultTypeCheckBoxElement = document.getElementById('faultTypeCheckBox');
    let faultTypeCheckBoxElementValue = faultTypeCheckBoxElement.checked;
    
    if (verifyResilienceTemplate(resilienceServiceAmountElementValue, timeOfServiceFailureElementValue, faultTypeCheckBoxElementValue)) {
        console.log("Save resilience template...");
        console.log(getGenerateAndPush__btn.disabled);
        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }
        
        // TODO: Check and verify which input is needed and adjust the class accordingly
        const newResilienceScenarioTemplate = new ResilienceTemplate(
            'test',
            'service failure',
            'application',
            'prod',
            'test',
            timeOfServiceFailureElementValue, resilienceServiceAmountElementValue, true);

        localStorage.setItem('resilienceTemplateObject', JSON.stringify(newResilienceScenarioTemplate));
        console.log("saved obj: ", newResilienceScenarioTemplate);
    }
    
}


export const verifyResilienceTemplate = (amountOfFailingInstances, timeToFailure, serviceFails) => {
    /**
     * Get HTML elements and their values
     */
    let resilienceServiceAmountElement = document.getElementById('resilienceServiceAmount');
    let timeOfServiceFailureElement = document.getElementById('timeOfServiceFailure');
    let faultTypeCheckBoxElement = document.getElementById('faultTypeCheckBox');


    /**
     * Get error msg elements
     */
    let resilienceServiceAmount__invalidElement = document.getElementById('resilienceServiceAmount__invalid');
    let timeOfServiceFailure__invalidElement = document.getElementById('timeOfServiceFailure__invalid');
    let faultTypeCheckBox__invalid = document.getElementById('faultTypeCheckBox__invalid');


    if (!amountOfFailingInstances) {
        console.log("amountOfFailingInstances is invalid!");
        resilienceServiceAmount__invalidElement.style.display = 'block';
        resilienceServiceAmountElement.style.borderColor = 'red';
    } else {
        resilienceServiceAmount__invalidElement.style.display = 'none';
        resilienceServiceAmountElement.style.borderColor = 'springgreen';
    }

    if (!timeToFailure) {
        console.log("timeToFailure is invalid");
        timeOfServiceFailure__invalidElement.style.display = 'block';
        timeOfServiceFailureElement.style.borderColor = 'red';
    } else {
        timeOfServiceFailure__invalidElement.style.display = 'none';
        timeOfServiceFailureElement.style.borderColor = 'springgreen';
    }

    if (!serviceFails) {
        console.log("serviceFails is invalid!");
        faultTypeCheckBox__invalid.style.display = 'block';
        faultTypeCheckBoxElement.style.borderColor = 'red';
        return false;
    } else {
        faultTypeCheckBox__invalid.style.display = 'none';
        faultTypeCheckBoxElement.style.borderColor = 'springgreen';
    }

    return true;
}