import { ResilienceTemplate } from '../classes/resilience/ResilienceTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';

export const saveResilienceTemplate = (selectedID) => {
    /**
    * Get HTML elements and their values
    */
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let getSummaryView = document.getElementById('summaryViewModal');

    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    let numberOfInstancesElement = document.getElementById('resilienceServiceAmount');
    let numberOfInstances = numberOfInstancesElement.value;

    let getResilienceScenarioDescriptionElement = document.getElementById('resilienceScenarioName');
    let scenarioDescription = getResilienceScenarioDescriptionElement.value;

    let getResilienceScenarioExecutionEnvironmentElement = document.getElementById('resilienceScenarioEnvironmentTypeSelect');
    let executionEnvironment = getResilienceScenarioExecutionEnvironmentElement.value;

    let getRandomizedServiceSelectionCheckbox = document.getElementById('randomServiceSelectionCheckBox');
    let randomizedServiceSelection = getRandomizedServiceSelectionCheckbox.checked;


    let timeOfServiceFailureElement = document.getElementById('timeOfServiceFailure');
    let timeOfServiceFailure = timeOfServiceFailureElement.value;

    let faultTypeCheckBoxElement = document.getElementById('faultTypeCheckBox');
    let faultTypeCheckBoxElementValue = faultTypeCheckBoxElement.checked;

    if (verifyResilienceTemplate(numberOfInstances, timeOfServiceFailure, faultTypeCheckBoxElementValue)) {
        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }

        let serviceName = getNodeName(selectedID);

        /**
         * This is probably not necessary for the future...
         */
        if (serviceName === '') {
            console.log('Please give the node a proper name that matches the architectural mapping!');
            return;
        }

        // TODO: check if this can be simplified with the checkbox state...
        if (randomizedServiceSelection === false) {
            randomizedServiceSelection = true
        }

        const newResilienceScenarioTemplate = new ResilienceTemplate(
            scenarioDescription,
            executionEnvironment,
            serviceName,
            timeOfServiceFailure, numberOfInstances, randomizedServiceSelection);

        localStorage.setItem(`resilience_${selectedID}`, JSON.stringify(newResilienceScenarioTemplate));

        if (!getSummaryView) {
            createSummaryView();
        } else {
            createNewSummaryForTemplate(newResilienceScenarioTemplate);
        }

        resilienceTemplateModal.style.display = 'none';
    }

}


export const verifyResilienceTemplate = (amountOfFailingInstances, timeToFailure, serviceFails) => {
    /**
     * Get HTML elements and their values
     */
    let numberOfInstances = document.getElementById('resilienceServiceAmount');
    let timeOfServiceFailureElement = document.getElementById('timeOfServiceFailure');
    let faultTypeCheckBoxElement = document.getElementById('faultTypeCheckBox');


    /**
     * Get error msg elements
     */
    let resilienceServiceAmount__invalidElement = document.getElementById('resilienceServiceAmount__invalid');
    let timeOfServiceFailure__invalidElement = document.getElementById('timeOfServiceFailure__invalid');
    let faultTypeCheckBox__invalid = document.getElementById('faultTypeCheckBox__invalid');


    if (!amountOfFailingInstances) {
        resilienceServiceAmount__invalidElement.style.display = 'block';
        numberOfInstances.style.borderColor = 'red';
    } else {
        resilienceServiceAmount__invalidElement.style.display = 'none';
        numberOfInstances.style.borderColor = 'springgreen';
    }

    if (!timeToFailure) {
        timeOfServiceFailure__invalidElement.style.display = 'block';
        timeOfServiceFailureElement.style.borderColor = 'red';
    } else {
        timeOfServiceFailure__invalidElement.style.display = 'none';
        timeOfServiceFailureElement.style.borderColor = 'springgreen';
    }

    if (!serviceFails) {
        faultTypeCheckBox__invalid.style.display = 'block';
        faultTypeCheckBoxElement.style.borderColor = 'red';
        return false;
    } else {
        faultTypeCheckBox__invalid.style.display = 'none';
        faultTypeCheckBoxElement.style.borderColor = 'springgreen';
    }

    return true;
}

/**
 * Retrieves the name of the currently selected node on which a test will be
 * modeled.
 * 
 * @param {} selectedID 
 */
export const getNodeName = (selectedID) => {
    let nodeName = $(`[data-element-id=${selectedID}]`).get(0);
    return nodeName.children[0].textContent;
}