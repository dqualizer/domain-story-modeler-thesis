
let elementContainer = document.getElementById('runtimeAnalysisSummaryContainer');
let modal__container = document.getElementById('modal__container');

export const createSummaryView = (templateObject) => {
    
    let summaryView__btn__open = document.createElement('button');
    summaryView__btn__open.innerText = 'Summary';
    summaryView__btn__open.classList.add('btn');
    summaryView__btn__open.classList.add('btn-primary');
    summaryView__btn__open.classList.add('custom-btn');
    
    /**
     * Opens the summary view
     */
    summaryView__btn__open.addEventListener('click', () => {
        summaryViewModal.style.display = 'block';
    });
    
    let summaryView__btn__close = document.createElement('button');
    summaryView__btn__close.innerText = 'Close';
    summaryView__btn__close.classList.add('btn');
    summaryView__btn__close.classList.add('btn-primary');
    summaryView__btn__close.classList.add('custom-btn');
    
    summaryView__btn__close.addEventListener('click', () => {
        summaryViewModal.style.display = 'none';
    })
    
    let summaryViewModal = document.createElement('div');
    summaryViewModal.classList.add('modal_resilience');
    summaryViewModal.id = 'summaryViewModal';
    
    let summaryViewModalContent = document.createElement('div');
    summaryViewModalContent.classList.add('modal_resilience_content');
    summaryViewModalContent.id = 'summaryViewModalContent';
    
    let summaryViewModalContentItems = document.createElement('div');
    summaryViewModalContentItems.classList.add('input__container');
    summaryViewModalContentItems.id = 'summaryViewModalContentItems';
    
    let summaryViewModalHeader = document.createElement('h3');
    summaryViewModalHeader.innerText = 'Summary';
    
    modal__container.appendChild(summaryViewModal);
    summaryViewModal.appendChild(summaryViewModalContent);
    summaryViewModalContent.appendChild(summaryViewModalHeader);
    summaryViewModalContent.appendChild(summaryViewModalContentItems);
    summaryViewModalContent.appendChild(summaryView__btn__close);
    elementContainer.appendChild(summaryView__btn__open);
    
    createNewSummaryForTemplate(templateObject);
}

export const createNewSummaryForTemplate = (templateObject) => {
    
    let getSummaryViewModalContentItems = document.getElementById('summaryViewModalContentItems');
    console.log(getSummaryViewModalContentItems);
    let newInputContainer = document.createElement('div');
    newInputContainer.classList.add('summary-input-container');
    
    for (const [key, value] of Object.entries(templateObject)) {
        console.log(`${key}: ${value}`);
        let newKeyElement = document.createElement('p');
        newKeyElement.innerText = key;
        
        let newValueElement = document.createElement('p');
        newValueElement.innerText = value;
        
        let row = document.createElement('div');
        row.classList.add('row-summary');
        
        row.appendChild(newKeyElement);
        row.appendChild(newValueElement);
        newInputContainer.appendChild(row);
    }
    
    getSummaryViewModalContentItems.appendChild(newInputContainer);
}