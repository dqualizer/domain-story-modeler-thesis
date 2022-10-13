// 'use-strict';
import { ResilienceEnvironmentEnum, ResilienceTemplate } from '../classes/resilience/ResilienceTemplate';
import { INVALID_RESPONSE_MEASURE, INFO_ENVIRONMENT_INFORMATION, INFO_EXECUTION_CONTEXT, INFO_SCENARIO_DESC, INFO_TYPE_OF_FAILURE, INFO_RANDOMIZATION, INFO_TIME_OF_SHUTDOWN, INFO_FAILING_INSTANCES, VERIFICATION_MODAL_NOTIFICATION, RESILIENCE_FAULT_TYPE_INFO, RESILIENCE_SCENARIO_NAME_INFO, RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO, SERVICE_FAILURE_AMOUNT_INFO, SERVICE_FAILURE_NAME_INFO, SERVICE_TIME_TO_FAILURE_INFO } from '../RuntimeAnalysisConstants';
import { saveResilienceTemplate } from './saveResilienceTemplate';
import { createDisabledGenerateBtn } from '../generateTemplateObject';
import { getNodeName, getNodeRectElementAndSetColor } from '../util/util';
import { existingLoadTestsView } from '../performance/ExistingLoadTestsView';

/**
 * Get Elements
 */
let elementContainer = document.getElementById('runtimeAnalysisSummaryContainer');
let modal__container = document.getElementById('modal__container');

/**
 * This should remove existing template views if the icon is removed from the canvas
 */
const clearRemovedRuntimeAnalysisViews = () => {
    let canvasItemsList = document.getElementsByClassName('djs-group');

    for (let i = 0; i < canvasItemsList.length; i++) {
        let SVGItemParent = canvasItemsList[i];
    }
}

const checkIfTemplateComplete = (selectedID) => {
    let timeOfServiceFailureElement = document.getElementById(`timeOfServiceFailure_${selectedID}`);
    let timeOfServiceFailure = timeOfServiceFailureElement.value;

    let stimulusCheckBoxElement = document.getElementById(`stimulusCheckBox_${selectedID}`);
    let stimulusCheckBoxElementValue = stimulusCheckBoxElement.checked;
    console.log(timeOfServiceFailure);
    if (!timeOfServiceFailure || !stimulusCheckBoxElementValue) {
        getNodeRectElementAndSetColor(selectedID, false, 'Resilience Template');
    }
}

const createButtonContainer = (selectedID) => {

    let modal_resilience_content = document.getElementById(`modal_resilience_content_${selectedID}`);
    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    let resilienceTemplateBtnContainerParent = document.createElement('div');

    let resilienceTemplateView__btn__close = document.createElement('button');
    let resilienceTemplateView__btn__save = document.createElement('button');

    resilienceTemplateBtnContainerParent.id = 'resilienceTemplateBtnContainerParent';

    resilienceTemplateView__btn__close.innerText = 'Close';
    resilienceTemplateView__btn__save.innerText = 'Save';

    resilienceTemplateView__btn__close.classList.add('btn');
    resilienceTemplateView__btn__close.classList.add('btn-secondary');
    resilienceTemplateView__btn__close.classList.add('custom-btn');

    resilienceTemplateView__btn__save.classList.add('btn');
    resilienceTemplateView__btn__save.classList.add('btn-primary');
    resilienceTemplateView__btn__save.classList.add('custom-btn');

    resilienceTemplateBtnContainerParent.classList.add('btn-container-parent');

    /**
     * Listeners
     */
    resilienceTemplateView__btn__close.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'none';
        checkIfTemplateComplete(selectedID);
    })

    resilienceTemplateView__btn__save.addEventListener('click', () => {
        saveResilienceTemplate(selectedID);
    })

    /**
     * Append children to container
     */

    resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateView__btn__save);
    resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateView__btn__close);

    modal_resilience_content.appendChild(resilienceTemplateBtnContainerParent);
}

/**
 * Creates new template view for resilience tests with a unique ID
 * For every new resilience scenario a new template is created
 * @param {} selectedID 
 */
export function createResilienceTemplateView(selectedID) {

    let getModalContainer = document.getElementById('existingLoadTests__modal__container');

    /**
     * Create html elements
     */
    let header = document.createElement('h3');
    header.innerText = 'Resilience Scenario';
    header.classList.add('template-header');

    let resilienceTemplateModal = document.createElement('div');
    resilienceTemplateModal.classList.add('modal_resilience');
    resilienceTemplateModal.id = `modal_resilience_${selectedID}`;

    let resilienceTemplateContent = document.createElement('div');
    resilienceTemplateContent.id = `modal_resilience_content_${selectedID}`;
    resilienceTemplateContent.classList.add('modal_resilience_content');

    let resilienceTemplateViewContainer__left = document.createElement('div');
    resilienceTemplateViewContainer__left.id = 'resilienceTemplateViewContainer__left';
    resilienceTemplateViewContainer__left.classList.add('input__container');

    let resilienceTemplateContentInputTopLevelContainer = document.createElement('div');
    resilienceTemplateContentInputTopLevelContainer.id = 'input__top__container';

    let resilienceTemplateViewContainer__right = document.createElement('div');
    resilienceTemplateViewContainer__right.id = `resilienceTemplateViewContainer__right_${selectedID}`;
    resilienceTemplateViewContainer__right.classList.add('input__container');

    let artifactDescriptor = document.createElement('p');
    artifactDescriptor.classList.add('label-padding');
    artifactDescriptor.innerText = 'Artifact';

    let artifactValue = document.createElement('p');
    artifactValue.classList.add('label-padding');
    artifactValue.innerText = getNodeName(selectedID);

    let artifactValueContainer = document.createElement('div');
    artifactValueContainer.classList.add('checkbox-child');

    let resilienceServiceAmount = document.createElement('input');
    resilienceServiceAmount.id = `resilienceServiceAmount_${selectedID}`;
    resilienceServiceAmount.type = 'number';
    resilienceServiceAmount.placeholder = 'Give a number for total failing services (min. 1)...';
    resilienceServiceAmount.disabled = true;
    resilienceServiceAmount.value = 1;

    let stimulusOccurrence__select = document.createElement('select');
    stimulusOccurrence__select.id = `stimulusOccurrence__select_${selectedID}`;

    let option_stimulus_once = document.createElement('option');
    option_stimulus_once.key = 'Once';
    option_stimulus_once.text = 'Once';

    let option_stimulus_twice_an_hour = document.createElement('option');
    option_stimulus_twice_an_hour.key = 'Twice an hour';
    option_stimulus_twice_an_hour.text = 'Twice an hour';

    let option_randomly = document.createElement('option');
    option_randomly.key = 'Randomly';
    option_randomly.text = 'Randomly';

    stimulusOccurrence__select.appendChild(option_stimulus_once);
    stimulusOccurrence__select.appendChild(option_stimulus_twice_an_hour);
    stimulusOccurrence__select.appendChild(option_randomly);

    let resilienceServiceAmount__info = document.createElement('i');
    resilienceServiceAmount__info.classList.add('bi');
    resilienceServiceAmount__info.classList.add('bi-info-circle');
    resilienceServiceAmount__info.classList.add('toolTip');

    resilienceServiceAmount__info.addEventListener('mouseover', () => {
        resilienceServiceAmount__info_text.style.display = 'block';
    });

    resilienceServiceAmount__info.addEventListener('mouseleave', () => {
        resilienceServiceAmount__info_text.style.display = 'none';
    })

    let resilienceServiceAmount__info_text = document.createElement('span');
    resilienceServiceAmount__info_text.classList.add('tooltipText');
    resilienceServiceAmount__info_text.id = `resilienceServiceAmount_${selectedID}_info_text`
    resilienceServiceAmount__info_text.innerText = INFO_FAILING_INSTANCES;

    let resilienceServiceAmountLabelContainer = document.createElement('div');
    resilienceServiceAmountLabelContainer.classList.add('label-container');

    let resilienceServiceAmount__label = document.createElement('label');
    resilienceServiceAmount__label.classList.add('label-padding');
    resilienceServiceAmount__label.id = 'resilienceServiceAmount__label';
    resilienceServiceAmount__label.setAttribute('for', `resilienceServiceAmount_${selectedID}`);
    resilienceServiceAmount__label.innerText = 'How often does the stimulus occur? (*)';

    let resilienceServiceAmount__invalid = document.createElement('p');
    resilienceServiceAmount__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
    resilienceServiceAmount__invalid.id = `resilienceServiceAmount__invalid_${selectedID}`;
    resilienceServiceAmount__invalid.classList.add('error-info');
    resilienceServiceAmount__invalid.style.display = 'none';

    let timeOfServiceFailure = document.createElement('input');
    timeOfServiceFailure.id = `timeOfServiceFailure_${selectedID}`;
    timeOfServiceFailure.type = 'number';
    timeOfServiceFailure.placeholder = 'E.g., 25'

    let timeOfServiceFailure__label = document.createElement('label');
    timeOfServiceFailure__label.id = 'timeOfServiceFailure__label';
    timeOfServiceFailure__label.setAttribute('for', `timeOfServiceFailure_${selectedID}`);
    timeOfServiceFailure__label.innerText = 'How long do you want to run this scenario? (*)';
    timeOfServiceFailure__label.classList.add('label-padding');

    let timeOfServiceFailure__label_info = document.createElement('i');
    timeOfServiceFailure__label_info.classList.add('bi');
    timeOfServiceFailure__label_info.classList.add('bi-info-circle');
    timeOfServiceFailure__label_info.classList.add('toolTip');

    timeOfServiceFailure__label_info.addEventListener('mouseover', () => {
        timeOfServiceFailure__label_info_text.style.display = 'block';
    });

    timeOfServiceFailure__label_info.addEventListener('mouseleave', () => {
        timeOfServiceFailure__label_info_text.style.display = 'none';
    })

    let timeOfServiceFailure__label_info_text = document.createElement('span');
    timeOfServiceFailure__label_info_text.classList.add('tooltipText');
    timeOfServiceFailure__label_info_text.id = `timeOfServiceFailure__label_info_text_${selectedID}_info_text`
    timeOfServiceFailure__label_info_text.innerText = INFO_TIME_OF_SHUTDOWN;

    let timeOfServiceFailureLabelContainer = document.createElement('div');
    timeOfServiceFailureLabelContainer.classList.add('label-container');

    let timeOfServiceFailure__invalid = document.createElement('p');
    timeOfServiceFailure__invalid.innerText = SERVICE_TIME_TO_FAILURE_INFO;
    timeOfServiceFailure__invalid.id = `timeOfServiceFailure__invalid_${selectedID}`;
    timeOfServiceFailure__invalid.classList.add('error-info');
    timeOfServiceFailure__invalid.style.display = 'none';

    let checkBoxContainerRandom = document.createElement('div');
    checkBoxContainerRandom.id = 'checkBoxContainerRandomServiceFailure';
    checkBoxContainerRandom.classList.add('checkbox-child');

    let checkBoxContainer__label = document.createElement('label');
    checkBoxContainer__label.classList.add('form-check-label');
    checkBoxContainer__label.classList.add('label-padding');
    checkBoxContainer__label.setAttribute('for', 'checkBoxContainerServiceFailure');
    checkBoxContainer__label.innerText = 'Randomized selection of service instances';

    let randomServiceSelectionCheckBox = document.createElement('input');
    randomServiceSelectionCheckBox.id = `randomServiceSelectionCheckBox_${selectedID}`;
    randomServiceSelectionCheckBox.type = 'checkbox';
    randomServiceSelectionCheckBox.classList.add('form-check-input');

    randomServiceSelectionCheckBox.addEventListener('click', () => {
        resilienceServiceAmount.disabled = !resilienceServiceAmount.disabled;
    })

    let randomServiceSelectionCheckBox__label = document.createElement('label');
    randomServiceSelectionCheckBox__label.classList.add('form-check-label');
    randomServiceSelectionCheckBox__label.setAttribute('for', `randomServiceSelectionCheckBox_${selectedID}`);
    randomServiceSelectionCheckBox__label.innerText = 'No';

    let randomizedServiceSelection__label_info = document.createElement('i');
    randomizedServiceSelection__label_info.classList.add('bi');
    randomizedServiceSelection__label_info.classList.add('bi-info-circle');
    randomizedServiceSelection__label_info.classList.add('toolTip');

    randomizedServiceSelection__label_info.addEventListener('mouseover', () => {
        randomizedServiceSelection__label_info_text.style.display = 'block';
    });

    randomizedServiceSelection__label_info.addEventListener('mouseleave', () => {
        randomizedServiceSelection__label_info_text.style.display = 'none';
    });


    let randomizedServiceSelection__label_info_text = document.createElement('span');
    randomizedServiceSelection__label_info_text.classList.add('tooltipText');
    randomizedServiceSelection__label_info_text.innerText = INFO_RANDOMIZATION;

    let randomizedServiceSelectionLabelContainer = document.createElement('div');
    randomizedServiceSelectionLabelContainer.classList.add('label-container');

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.id = 'checkBoxContainerstimulus';
    checkBoxContainer.classList.add('checkbox-parent');

    let checkBoxContainerChildstimulusServiceShutdown = document.createElement('div');
    checkBoxContainerChildstimulusServiceShutdown.classList.add('checkbox-child');

    let checkBoxContainerChildstimulusOtherThan = document.createElement('div');
    checkBoxContainerChildstimulusOtherThan.classList.add('checkbox-child');

    let checkBoxContainerChildstimulusLaterThan = document.createElement('div');
    checkBoxContainerChildstimulusLaterThan.classList.add('checkbox-child');

    let stimulusOtherThanCheckbox = document.createElement('input');
    stimulusOtherThanCheckbox.id = `stimulusOtherThanCheckbox_${selectedID}`;
    stimulusOtherThanCheckbox.type = 'checkbox';
    stimulusOtherThanCheckbox.classList.add('form-check-input');

    let stimulusOtherThanCheckbox__label = document.createElement('label');
    stimulusOtherThanCheckbox__label.classList.add('form-check-label');
    stimulusOtherThanCheckbox__label.setAttribute('for', `stimulusOtherThanCheckbox_${selectedID}`);
    stimulusOtherThanCheckbox__label.innerText = 'Different response data';

    let stimulusLaterThanCheckbox = document.createElement('input');
    stimulusLaterThanCheckbox.id = `stimulusLaterThanCheckbox_${selectedID}`;
    stimulusLaterThanCheckbox.type = 'checkbox';
    stimulusLaterThanCheckbox.classList.add('form-check-input');

    stimulusLaterThanCheckbox.addEventListener('click', () => {
        responseMeasureResponseTimeInput.disabled = !responseMeasureResponseTimeInput.disabled;
        if (responseMeasureResponseTimeInput.disabled) {
            responseMeasureResponseTimeCheckbox__label.classList.add('text-disabled');
            responseMeasureResponseTimeCheckbox__label.classList.remove('text-enabled');
        } else {
            responseMeasureResponseTimeCheckbox__label.classList.remove('text-disabled');
            responseMeasureResponseTimeCheckbox__label.classList.add('text-enabled');
        }
    })

    let stimulusLaterThanCheckbox__label = document.createElement('label');
    stimulusLaterThanCheckbox__label.classList.add('form-check-label');
    stimulusLaterThanCheckbox__label.setAttribute('for', `stimulusLaterThanCheckbox_${selectedID}`);
    stimulusLaterThanCheckbox__label.innerText = 'Response arrives later than usual';

    let stimulusCheckBox = document.createElement('input');
    stimulusCheckBox.id = `stimulusCheckBox_${selectedID}`;
    stimulusCheckBox.type = 'checkbox';
    stimulusCheckBox.classList.add('form-check-input');

    stimulusCheckBox.addEventListener('click', () => {
        responseMeasureRecoveryTimeInput.disabled = !responseMeasureRecoveryTimeInput.disabled;
        if (responseMeasureRecoveryTimeInput.disabled) {
            responseMeasureRecoveryTimeCheckbox__label.classList.add('text-disabled');
            responseMeasureRecoveryTimeCheckbox__label.classList.remove('text-enabled');
        } else {
            responseMeasureRecoveryTimeCheckbox__label.classList.remove('text-disabled');
            responseMeasureRecoveryTimeCheckbox__label.classList.add('text-enabled');
        }
    });

    let stimulusCheckBox__label = document.createElement('label');
    stimulusCheckBox__label.classList.add('form-check-label');
    stimulusCheckBox__label.setAttribute('for', `stimulusCheckBox_${selectedID}`);
    stimulusCheckBox__label.innerText = 'No response';

    let stimulusLabelContainer = document.createElement('div');
    stimulusLabelContainer.classList.add('label-container');

    let stimulusCheckBox__label_info = document.createElement('i');
    stimulusCheckBox__label_info.classList.add('bi');
    stimulusCheckBox__label_info.classList.add('bi-info-circle');
    stimulusCheckBox__label_info.classList.add('toolTip');

    stimulusCheckBox__label_info.addEventListener('mouseover', () => {
        stimulusCheckBox__label_info_text.style.display = 'block';
    });

    stimulusCheckBox__label_info.addEventListener('mouseleave', () => {
        stimulusCheckBox__label_info_text.style.display = 'none';
    });

    let stimulusCheckBox__label_info_text = document.createElement('span');
    stimulusCheckBox__label_info_text.classList.add('tooltipText');
    stimulusCheckBox__label_info_text.innerText = INFO_TYPE_OF_FAILURE;

    let stimulusCheckBoxContainer__label = document.createElement('label');
    stimulusCheckBoxContainer__label.classList.add('form-check-label');
    stimulusCheckBoxContainer__label.classList.add('label-padding');
    stimulusCheckBoxContainer__label.setAttribute('for', 'checkBoxContainerstimulus');
    stimulusCheckBoxContainer__label.innerText = 'Stimulus (*)';

    let resilienceScenarioEnvironmentSelect = document.createElement('select');
    resilienceScenarioEnvironmentSelect.id = `resilienceScenarioEnvironmentTypeSelect_${selectedID}`;

    let option_no = document.createElement('option');
    option_no.key = 'No';
    option_no.text = 'No';
    option_no.selected = 'true';

    let option_yes = document.createElement('option');
    option_yes.key = 'Yes';
    option_yes.text = 'Yes';

    resilienceScenarioEnvironmentSelect.addEventListener('change', () => {
        if (resilienceScenarioEnvironmentSelect.value == 'Yes') {
            environment_select_information_container.style.display = 'block';
            executionContextInformation_container.style.display = 'none';
        } else {
            environment_select_information_container.style.display = 'none';
            executionContextInformation_container.style.display = 'block';
        }
    })

    let environment_select_information_container = document.createElement('div');
    environment_select_information_container.id = `environment_select_information_container_${selectedID}`;
    environment_select_information_container.style.display = 'none';

    let user_information = document.createElement('p');
    user_information.innerText = 'Caution: Your scenario will be executed in the production environment. '
        + 'This may lead to users experiencing the selected stimulus, at least for the duration you specified';

    resilienceScenarioEnvironmentSelect.appendChild(option_no);
    resilienceScenarioEnvironmentSelect.appendChild(option_yes);

    let resilienceScenarioEnvironment__label = document.createElement('label');
    resilienceScenarioEnvironment__label.innerText = 'Do you want your users to notice the stimulus? (*)';
    resilienceScenarioEnvironment__label.setAttribute("for", `resilienceScenarioEnvironmentTypeSelect_${selectedID}`);
    resilienceScenarioEnvironment__label.classList.add('label-padding');

    let resilienceScenarioEnvironmentLabelContainer = document.createElement('div');
    resilienceScenarioEnvironmentLabelContainer.classList.add('label-container');

    let resilienceScenarioEnvironment__label_info = document.createElement('i');
    resilienceScenarioEnvironment__label_info.classList.add('bi');
    resilienceScenarioEnvironment__label_info.classList.add('bi-info-circle');
    resilienceScenarioEnvironment__label_info.classList.add('toolTip');

    resilienceScenarioEnvironment__label_info.addEventListener('mouseover', () => {
        resilienceScenarioEnvironment__label_info_text.style.display = 'block';
    });

    resilienceScenarioEnvironment__label_info.addEventListener('mouseleave', () => {
        resilienceScenarioEnvironment__label_info_text.style.display = 'none';
    });

    let resilienceScenarioEnvironment__label_info_text = document.createElement('span');
    resilienceScenarioEnvironment__label_info_text.classList.add('tooltipText');
    resilienceScenarioEnvironment__label_info_text.innerText = INFO_EXECUTION_CONTEXT;

    let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
    resilienceScenarioEnvironmentType__invalid.id = `resilienceScenarioEnvironmentType__invalid_${selectedID}`;
    resilienceScenarioEnvironmentType__invalid.innerText = RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO;
    resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
    resilienceScenarioEnvironmentType__invalid.style.display = 'none';

    let existingLoadTests__container = document.createElement('div');
    existingLoadTests__container.id = `existingLoadTests__container_${selectedID}`;
    existingLoadTests__container.style.display = 'block';
    existingLoadTests__container.classList.add('checkbox-parent');

    let existingLoadTests__label__container = document.createElement('div');
    existingLoadTests__label__container.classList.add('label-container');

    let existingLoadTests__child__container = document.createElement('div');
    existingLoadTests__child__container.classList.add('checkbox-child');

    let existingLoadTests__button__container = document.createElement('div');
    existingLoadTests__button__container.classList.add('checkbox-child');

    let existingLoadTests__button = document.createElement('button');
    existingLoadTests__button.id = `existingLoadTests__button_${selectedID}`;
    existingLoadTests__button.classList.add('btn');
    existingLoadTests__button.classList.add('btn-primary');
    existingLoadTests__button.innerText = 'Show loadtests';
    existingLoadTests__button.disabled = true;

    existingLoadTests__button.addEventListener('click', () => {
        console.log("Open existing load tests...");
        getModalContainer.style.display = 'block';
    })

    let existingLoadTests__input = document.createElement('input');
    existingLoadTests__input.id = `existingLoadTests__input_${selectedID}`;
    existingLoadTests__input.type = 'checkbox';
    existingLoadTests__input.classList.add('form-check-input');
    
    existingLoadTests__input.addEventListener('click', () => {
        if (existingLoadTests__input.checked) {
            existingLoadTests__button.disabled = false;
        } else {
            existingLoadTests__button.disabled = true;
        }
    })

    let existingLoadTests__input__label = document.createElement('label');
    existingLoadTests__input__label.setAttribute('for', `existingLoadTests__input_${selectedID}`);
    existingLoadTests__input__label.classList.add('form-check-label');
    existingLoadTests__input__label.innerText = 'Use existing loadtests';

    let executionContextInformation_container = document.createElement('div');
    executionContextInformation_container.id = `executionContextInformation_container_${selectedID}`;
    executionContextInformation_container.style.display = 'block';

    let executionContextScheduleContainerOfficeHours = document.createElement('div');
    executionContextScheduleContainerOfficeHours.id = 'executionContextScheduleContainerOfficeHours';
    executionContextScheduleContainerOfficeHours.classList.add('checkbox-child');

    let executionContextScheduleContainerOffHours = document.createElement('div');
    executionContextScheduleContainerOffHours.id = 'executionContextScheduleContainerOffHours';
    executionContextScheduleContainerOffHours.classList.add('checkbox-child');

    let executionContextScheduleParentContainer = document.createElement('div');
    executionContextScheduleParentContainer.id = 'executionContextScheduleParentContainer';
    executionContextScheduleParentContainer.classList.add('checkbox-parent');

    let executionContextScheduleParentContainer__label = document.createElement('label');
    executionContextScheduleParentContainer__label.id = 'executionContextScheduleParentContainer__label';
    executionContextScheduleParentContainer__label.innerText = 'Select a time slot for your scenario';
    executionContextScheduleParentContainer__label.setAttribute('for', 'executionContextScheduleParentContainer');
    executionContextScheduleParentContainer__label.classList.add('form-check-label');
    executionContextScheduleParentContainer__label.classList.add('label-padding');

    let executionContextLabelContainer = document.createElement('div');
    executionContextLabelContainer.classList.add('label-container');

    let executionContext__label_info = document.createElement('i');
    executionContext__label_info.classList.add('bi');
    executionContext__label_info.classList.add('bi-info-circle');
    executionContext__label_info.classList.add('toolTip');

    executionContext__label_info.addEventListener('mouseover', () => {
        executionContext__label_info_text.style.display = 'block';
    });

    executionContext__label_info.addEventListener('mouseleave', () => {
        executionContext__label_info_text.style.display = 'none';
    });

    let executionContext__label_info_text = document.createElement('span');
    executionContext__label_info_text.classList.add('tooltipText');
    executionContext__label_info_text.innerText = INFO_ENVIRONMENT_INFORMATION;

    let executionContextWorkingHoursCheckBox = document.createElement('input');
    executionContextWorkingHoursCheckBox.id = `executionContextWorkingHoursCheckBox_${selectedID}`;
    executionContextWorkingHoursCheckBox.type = 'checkbox';
    executionContextWorkingHoursCheckBox.classList.add('form-check-input');
    executionContextWorkingHoursCheckBox.classList.add('label-padding');;

    let executionContextWorkingHoursCheckBox__label = document.createElement('label');
    executionContextWorkingHoursCheckBox__label.id = 'executionContextWorkingHoursCheckBox__label';
    executionContextWorkingHoursCheckBox__label.innerText = 'Office Hours 08:00 am to 16:00 pm';
    executionContextWorkingHoursCheckBox__label.classList.add('form-check-label')
    executionContextWorkingHoursCheckBox__label.setAttribute('for', `executionContextWorkingHoursCheckBox_${selectedID}`);

    let executionContextOffWorkingHoursCheckBox = document.createElement('input');
    executionContextOffWorkingHoursCheckBox.id = `executionContextOffWorkingHoursCheckBox_${selectedID}`;
    executionContextOffWorkingHoursCheckBox.type = 'checkbox';
    executionContextOffWorkingHoursCheckBox.classList.add('form-check-input');
    executionContextOffWorkingHoursCheckBox.classList.add('label-padding');

    let executionContextOffWorkingHoursCheckBox__label = document.createElement('label');
    executionContextOffWorkingHoursCheckBox__label.id = 'executionContextOffWorkingHoursCheckBox__label';
    executionContextOffWorkingHoursCheckBox__label.innerText = 'Off Schedule after 16:00 pm';
    executionContextOffWorkingHoursCheckBox__label.classList.add('form-check-label')
    executionContextOffWorkingHoursCheckBox__label.setAttribute('for', `executionContextOffWorkingHoursCheckBox_${selectedID}`);

    let stimulusCheckBox__invalid = document.createElement('p');
    stimulusCheckBox__invalid.id = `stimulusCheckBox__invalid_${selectedID}`;
    stimulusCheckBox__invalid.innerText = RESILIENCE_FAULT_TYPE_INFO;
    stimulusCheckBox__invalid.classList.add('error-info');
    stimulusCheckBox__invalid.style.display = 'none';

    let responseMeasureCheckboxContainer = document.createElement('div');
    responseMeasureCheckboxContainer.classList.add('checkbox-parent');

    let responseMeasure__invalid = document.createElement('p');
    responseMeasure__invalid.id = `responseMeasure__invalid_${selectedID}`;
    responseMeasure__invalid.innerText = INVALID_RESPONSE_MEASURE;
    responseMeasure__invalid.classList.add('error-info');
    responseMeasure__invalid.style.display = 'none';

    let responseMeasureCheckBoxLabelContainer = document.createElement('div');
    responseMeasureCheckBoxLabelContainer.classList.add('label-container');

    let responseMeasureCheckboxLabel = document.createElement('label');
    responseMeasureCheckboxLabel.innerText = 'Response Measure (*)';
    responseMeasureCheckboxLabel.classList.add('label-padding');

    let responseMeasureCheckboxLabel__info = document.createElement('i');
    responseMeasureCheckboxLabel__info.classList.add('bi');
    responseMeasureCheckboxLabel__info.classList.add('bi-info-circle');
    responseMeasureCheckboxLabel__info.classList.add('toolTip');
    
    // <div class="btn-group btn-group-toggle" data-toggle="buttons">
    //     <label class="btn btn-secondary active">
    //         <input type="radio" name="options" id="option1" autocomplete="off" checked> Active
    //     </label>
    //     <label class="btn btn-secondary">
    //         <input type="radio" name="options" id="option2" autocomplete="off"> Radio
    //     </label>
    //     <label class="btn btn-secondary">
    //         <input type="radio" name="options" id="option3" autocomplete="off"> Radio
    //     </label>
    // </div>
    
    /**
     * Button group for Response Times in Response Measure
     */
    let responseMeasureBtn__group = document.createElement('div');
    responseMeasureBtn__group.setAttribute('data-toggle', 'buttons');
    responseMeasureBtn__group.classList.add('btn-group');
    responseMeasureBtn__group.classList.add('btn-group-toggle');
    
    let satisfied__label = document.createElement('label');
    satisfied__label.classList.add('btn');
    satisfied__label.classList.add('btn-secondary');
    satisfied__label.innerText = "Active";
    
    let satisfied__input = document.createElement('button');
    satisfied__input.type = 'button';
    satisfied__input.name = 'options';
    satisfied__input.id = `satisfied__option__key_${selectedID}`;
    satisfied__input.innerText = 'Active';
    satisfied__input.classList.add('btn');
    satisfied__input.classList.add('btn-outline-primary');
    satisfied__input.classList.add('btn-group-btn');
    
    satisfied__input.addEventListener('click', () => {
        console.log(satisfied__input.clicked == true);
        tolerated__input.classList.remove('active');
        frustrated__input.classList.remove('active');
    })
    
    let tolerated__input = document.createElement('button');
    tolerated__input.type = 'button';
    tolerated__input.name = 'options';
    tolerated__input.id = `tolerated__input__option__key_${selectedID}`;
    tolerated__input.innerText = 'Tolerated';
    tolerated__input.classList.add('btn');
    tolerated__input.classList.add('btn-outline-primary');
    tolerated__input.classList.add('btn-group-btn');
    
    tolerated__input.addEventListener('click', () => {
        satisfied__input.classList.remove('active');
        frustrated__input.classList.remove('active');
    })
    
    let frustrated__input = document.createElement('button');
    frustrated__input.type = 'button';
    frustrated__input.name = 'options';
    frustrated__input.id = `frustrated__input__option__key_${selectedID}`;
    frustrated__input.innerText = 'Frustrated';
    frustrated__input.classList.add('btn');
    frustrated__input.classList.add('btn-outline-primary');
    frustrated__input.classList.add('btn-group-btn');
    
    frustrated__input.addEventListener('click', () => {
        satisfied__input.classList.remove('active');
        tolerated__input.classList.remove('active');
    })
    
    let responseTime__label = document.createElement('label');
    responseTime__label.classList.add('form-check-label');
    responseTime__label.setAttribute('for', 'satisfied__option__key')
    responseTime__label.innerText = 'Response time';
    responseTime__label.classList.add('text-disabled');
    
    responseMeasureBtn__group.appendChild(satisfied__input);
    responseMeasureBtn__group.appendChild(tolerated__input);
    responseMeasureBtn__group.appendChild(frustrated__input);
    
    let responseMeasureResponseTimeCheckboxContainerChild = document.createElement('div');
    responseMeasureResponseTimeCheckboxContainerChild.classList.add('checkbox-child');
    responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseTime__label);
    responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureBtn__group);

    let responseMeasureResponseTimeCheckbox = document.createElement('input');
    responseMeasureResponseTimeCheckbox.type = 'checkbox';
    responseMeasureResponseTimeCheckbox.id = `responseMeasureCheckbox_${selectedID}`;
    responseMeasureResponseTimeCheckbox.classList.add('form-check-input');
    responseMeasureResponseTimeCheckbox.classList.add('label-padding');

    responseMeasureResponseTimeCheckbox.addEventListener('click', () => {
        responseMeasureResponseTimeInput.disabled = !responseMeasureResponseTimeInput.disabled;
    });

    let responseMeasureResponseTimeInput = document.createElement('input');
    responseMeasureResponseTimeInput.id = `responseMeasureResponseTimeInput_${selectedID}`;
    responseMeasureResponseTimeInput.type = 'number';
    responseMeasureResponseTimeInput.placeholder = 'E.g., 1000 ms...';
    responseMeasureResponseTimeInput.disabled = true;
    responseMeasureResponseTimeInput.style.height = '20px';
    responseMeasureResponseTimeInput.style.width = '135px';

    

    let responseTimeReferenceValue = document.createElement('p');
    responseTimeReferenceValue.classList.add('reference-values');
    responseTimeReferenceValue.innerText = '(approx. < 3000 ms)'

    let responseMeasureRecoveryTimeCheckboxContainerChild = document.createElement('div');
    responseMeasureRecoveryTimeCheckboxContainerChild.classList.add('checkbox-child');

    let responseMeasureRecoveryTimeCheckbox = document.createElement('input');
    responseMeasureRecoveryTimeCheckbox.type = 'checkbox';
    responseMeasureRecoveryTimeCheckbox.id = `responseMeasureRecoveryTimeCheckbox_${selectedID}`;
    responseMeasureRecoveryTimeCheckbox.classList.add('form-check-input');
    responseMeasureRecoveryTimeCheckbox.classList.add('label-padding');

    responseMeasureRecoveryTimeCheckbox.addEventListener('click', () => {
        responseMeasureRecoveryTimeInput.disabled = !responseMeasureRecoveryTimeInput.disabled;
    });

    let responseMeasureRecoveryTimeInput = document.createElement('input');
    responseMeasureRecoveryTimeInput.id = `responseMeasureRecoveryTimeInput_${selectedID}`;
    responseMeasureRecoveryTimeInput.type = 'number';
    responseMeasureRecoveryTimeInput.placeholder = 'E.g., 50000 ms';
    responseMeasureRecoveryTimeInput.disabled = true;
    responseMeasureRecoveryTimeInput.style.height = '20px';
    responseMeasureRecoveryTimeInput.style.width = '135px';

    let responseMeasureRecoveryTimeCheckbox__label = document.createElement('label');
    responseMeasureRecoveryTimeCheckbox__label.classList.add('form-check-label');
    responseMeasureRecoveryTimeCheckbox__label.setAttribute('for', `responseMeasureRecoveryTimeCheckbox_${selectedID}`);
    responseMeasureRecoveryTimeCheckbox__label.innerText = 'Recovery Time';
    responseMeasureRecoveryTimeCheckbox__label.classList.add('text-disabled');

    let recoverTimeReferenceValue = document.createElement('p');
    recoverTimeReferenceValue.classList.add('reference-values');
    recoverTimeReferenceValue.innerText = '(approx. < 5 min)';

    /**
     * This is probably going to be the summary view for all resilience scenarios
     */
    let resilienceTemplateView__btn__open = document.createElement('button');
    resilienceTemplateView__btn__open.id = selectedID;
    resilienceTemplateView__btn__open.innerText = 'Resilience Scenario ' + selectedID;
    // elementContainer.appendChild(resilienceTemplateView__btn__open);
    resilienceTemplateView__btn__open.classList.add('btn');
    resilienceTemplateView__btn__open.classList.add('btn-primary');

    // Opens the resilience template (summary) view
    resilienceTemplateView__btn__open.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'block';
    });

    /**
     * Appending all child nodes to parent container, i.e., template view
     */
    modal__container.appendChild(resilienceTemplateModal);
    resilienceTemplateModal.appendChild(resilienceTemplateContent);
    resilienceTemplateContent.appendChild(header);
    resilienceTemplateContent.appendChild(resilienceTemplateContentInputTopLevelContainer);

    existingLoadTests__button__container.appendChild(existingLoadTests__button);

    existingLoadTests__child__container.appendChild(existingLoadTests__input__label);
    existingLoadTests__child__container.appendChild(existingLoadTests__input);

    environment_select_information_container.appendChild(user_information);

    resilienceServiceAmountLabelContainer.appendChild(resilienceServiceAmount__label);
    resilienceServiceAmountLabelContainer.appendChild(resilienceServiceAmount__info);
    resilienceServiceAmountLabelContainer.appendChild(resilienceServiceAmount__info_text);

    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label);
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label_info);
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label_info_text);

    randomizedServiceSelectionLabelContainer.appendChild(checkBoxContainer__label);
    randomizedServiceSelectionLabelContainer.appendChild(randomizedServiceSelection__label_info);
    randomizedServiceSelectionLabelContainer.appendChild(randomizedServiceSelection__label_info_text);

    stimulusLabelContainer.appendChild(stimulusCheckBoxContainer__label);
    stimulusLabelContainer.appendChild(stimulusCheckBox__label_info);
    stimulusLabelContainer.appendChild(stimulusCheckBox__label_info_text);

    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info);
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info_text);

    executionContextLabelContainer.appendChild(executionContextScheduleParentContainer__label);
    executionContextLabelContainer.appendChild(executionContext__label_info);
    executionContextLabelContainer.appendChild(executionContext__label_info_text);

    responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel);
    responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel__info);
    // TODO info text element

    responseMeasureCheckboxContainer.appendChild(responseMeasureRecoveryTimeCheckboxContainerChild);
    responseMeasureCheckboxContainer.appendChild(recoverTimeReferenceValue);
    responseMeasureCheckboxContainer.appendChild(responseMeasureResponseTimeCheckboxContainerChild);
    responseMeasureCheckboxContainer.appendChild(responseTimeReferenceValue);

    // responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureResponseTimeCheckbox__label);
    // responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureResponseTimeInput);

    responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(responseMeasureRecoveryTimeCheckbox__label);
    responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(responseMeasureRecoveryTimeInput);

    artifactValueContainer.appendChild(artifactDescriptor);
    artifactValueContainer.appendChild(artifactValue);

    checkBoxContainerChildstimulusServiceShutdown.appendChild(stimulusCheckBox__label);
    checkBoxContainerChildstimulusServiceShutdown.appendChild(stimulusCheckBox);

    checkBoxContainerChildstimulusOtherThan.appendChild(stimulusOtherThanCheckbox__label);
    checkBoxContainerChildstimulusOtherThan.appendChild(stimulusOtherThanCheckbox);

    checkBoxContainerChildstimulusLaterThan.appendChild(stimulusLaterThanCheckbox__label);
    checkBoxContainerChildstimulusLaterThan.appendChild(stimulusLaterThanCheckbox);

    checkBoxContainer.appendChild(checkBoxContainerChildstimulusServiceShutdown);
    checkBoxContainer.appendChild(checkBoxContainerChildstimulusOtherThan);
    checkBoxContainer.appendChild(checkBoxContainerChildstimulusLaterThan);

    executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox__label);
    executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox);

    executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox__label);
    executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox);

    executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOfficeHours);
    executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOffHours);
    executionContextScheduleParentContainer.appendChild(existingLoadTests__child__container);
    executionContextScheduleParentContainer.appendChild(existingLoadTests__button__container);

    executionContextInformation_container.appendChild(executionContextLabelContainer);
    executionContextInformation_container.appendChild(executionContextScheduleParentContainer);

    // this goes right
    resilienceTemplateViewContainer__right.appendChild(resilienceServiceAmountLabelContainer);
    resilienceTemplateViewContainer__right.appendChild(stimulusOccurrence__select);
    resilienceTemplateViewContainer__right.appendChild(resilienceServiceAmount__invalid);
    resilienceTemplateViewContainer__right.appendChild(timeOfServiceFailureLabelContainer);
    resilienceTemplateViewContainer__right.appendChild(timeOfServiceFailure);
    resilienceTemplateViewContainer__right.appendChild(timeOfServiceFailure__invalid);

    resilienceTemplateViewContainer__right.appendChild(resilienceScenarioEnvironmentLabelContainer);
    resilienceTemplateViewContainer__right.appendChild(resilienceScenarioEnvironmentSelect);
    resilienceTemplateViewContainer__right.appendChild(environment_select_information_container);
    resilienceTemplateViewContainer__right.appendChild(executionContextInformation_container);
    // resilienceTemplateViewContainer__right.appendChild(executionContextScheduleParentContainer);



    // this goes left
    resilienceTemplateViewContainer__left.appendChild(artifactValueContainer);
    resilienceTemplateViewContainer__left.appendChild(stimulusLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(checkBoxContainer);
    resilienceTemplateViewContainer__left.appendChild(stimulusCheckBox__invalid);
    resilienceTemplateViewContainer__left.appendChild(responseMeasureCheckBoxLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(responseMeasureCheckboxContainer);
    resilienceTemplateViewContainer__left.appendChild(responseMeasure__invalid);

    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateViewContainer__left);
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateViewContainer__right);

    existingLoadTestsView(selectedID);
    createButtonContainer(selectedID);
    resilienceTemplateModal.style.display = 'block';

    /**
     * Check if ggenerate button already exists, create otherwise. 
     */
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    if (!getGenerateAndPush__btn) {
        createDisabledGenerateBtn();
    }
}

const removeResilienceTemplateForNode = (selectedID) => {
    let getNode = $(`[data-element-id=${selectedID}`).get(0);
    let getSummaryView = document.getElementById(selectedID);

    console.log("Found the following node: ", getNode);
    console.log("Found the following summary view: ", getSummaryView);

    getSummaryView.remove();
}

/**
 * Creates a resilience template from a selected node;
 * @param {} selectedID
 */
export const createResilienceTemplate = (selectedID) => {

    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    if (resilienceTemplateModal) {
        console.log("Modal exists with id: ", resilienceTemplateModal.id);
        resilienceTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createResilienceTemplateView(selectedID);
    }
}

