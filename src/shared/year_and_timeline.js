import { useSelect, useDispatch } from '@wordpress/data';
import { TextControl, SelectControl, __experimentalHStack as HStack } from '@wordpress/components';

let _meta, _setMeta, _postId, tags, currentTags, options, valueYear, valueYearEnd, valueYearName, valueYearEndName, editEntityRecord = null;

function onChangeTimeline(value) {
    value = parseInt(value, 10);
    editEntityRecord('postType', 'mve_timeline_item', _postId, {
        'mve_timeline': !isNaN(value) ? [parseInt(value, 10)] : [0]
    });
}

const updateYear = (newValue) => {
    if (newValue === '') {
        _setMeta({ ..._meta, mve_timeline_year: null });
    } else {
        newValue = parseInt(newValue, 10);
        _setMeta({ ..._meta, mve_timeline_year: !isNaN(newValue) ? newValue.toString() : null });
    }
};

const updateYearName = (newValue) => {
    if (newValue === '') {
        _setMeta({ ..._meta, mve_timeline_year_name: null });
    } else {
        _setMeta({ ..._meta, mve_timeline_year_name: newValue });
    }
};

const updateYearEnd = (newValue) => {
    if (newValue === '') {
        _setMeta({ ..._meta, mve_timeline_year_end: null });
    } else {
        newValue = parseInt(newValue, 10);
        _setMeta({ ..._meta, mve_timeline_year_end: !isNaN(newValue) ? newValue.toString() : null });
    }
};

const updateYearEndName = (newValue) => {
    if (newValue === '') {
        _setMeta({ ..._meta, mve_timeline_year_end_name: null });
    } else {
        _setMeta({ ..._meta, mve_timeline_year_end_name: newValue });
    }
};

const requiredMissingStyle = {
    backgroundColor: 'red',
    color: 'white'
};

export const init = function (meta, setMeta, postId) {
    _meta = meta;
    _setMeta = setMeta;
    _postId = postId;

    const dispatchObject = useDispatch('core');
    editEntityRecord = dispatchObject.editEntityRecord;

    tags = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'mve_timeline', { orderBy: 'name', 'order': 'asc', 'per_page': -1 }); // name and slug
    });

    currentTags = useSelect(
        (select) => select('core/editor').getEditedPostAttribute('mve_timeline'),
        []
    );

    options = [{
        value: 0,
        label: 'Choose timeline...'
    }].concat(tags ? tags.map((tag) => {
        return {
            value: tag.id,
            label: tag.name
        };
    }) : []);

    valueYear = meta['mve_timeline_year'] ?? '';
    valueYearEnd = meta['mve_timeline_year_end'] ?? '';
    valueYearName = meta['mve_timeline_year_name'] ?? '';
    valueYearEndName = meta['mve_timeline_year_end_name'] ?? '';
};

export const Widget = function () {
    return (<>
        <HStack>
            <TextControl style={!valueYear ? requiredMissingStyle : null} onChange={updateYear} value={valueYear} label="Year start *" />
            <TextControl onChange={updateYearEnd} value={valueYearEnd} label="Year end" />
        </HStack>
        <HStack>
            <TextControl onChange={updateYearName} value={valueYearName} label="Year start name" />
            <TextControl onChange={updateYearEndName} value={valueYearEndName} label="Year end name" />
        </HStack>
        <SelectControl style={(!currentTags || currentTags.length === 0 || currentTags[0] === 0) ? requiredMissingStyle : null} label="Timeline *" options={options} onChange={onChangeTimeline} value={currentTags ? currentTags[0] : ''} />
    </>);
};