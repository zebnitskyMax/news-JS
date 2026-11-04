import './sources.css';
import { ISource } from '../../controller/types';

class Sources {
    public draw(data: ReadonlyArray<ISource>): void { 
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) return; 

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector('.source__item-name');
            if (nameEl) nameEl.textContent = item.name;

            const itemEl = sourceClone.querySelector('.source__item');
            if (itemEl) itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) sourcesContainer.append(fragment);
    }
}

export default Sources;