import { useState } from 'react';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { __experimentalText as Text, TextControl, Button, Card, CardBody, CardHeader, __experimentalHeading as Heading } from '@wordpress/components'

let _meta, _setMeta, metaFieldValue = null;

export const init = function (meta, setMeta) {
    _meta = meta;
    _setMeta = setMeta;
    metaFieldValue = meta['mve_timeline_links'];
    if (!metaFieldValue) {
        metaFieldValue = [];
    } else {
        metaFieldValue = JSON.parse(metaFieldValue); // [{"name": "", "url": ""}]
    }
};

export const Widget = function () {

    const [valueName, setValueName] = useState('');
    const [valueUrl, setValueUrl] = useState('');

    const addMetaValue = () => {
        metaFieldValue.push({
            name: valueName,
            url: valueUrl
        });
        _setMeta({ ..._meta, mve_timeline_links: JSON.stringify(metaFieldValue) });
        setValueName('');
        setValueUrl('');
    };

    const removeLink = (valueToRemove) => {
        const newMetaFieldValue = [];
        for (const val of metaFieldValue) {
            if (val.name === valueToRemove.name && val.url === valueToRemove.url) {

            } else {
                newMetaFieldValue.push(val);
            }
        }
        _setMeta({ ..._meta, mve_timeline_links: JSON.stringify(newMetaFieldValue) });
    };

    return (
        <><ul style={{ overflowX: 'auto', listStyleType: 'none', padding: 0, margin: 0, marginBottom: '1rem' }}>
            {metaFieldValue.map((link) => (
                <li key={link.url} style={{ whiteSpace: 'nowrap' }}><Button isDestructive size="small" onClick={() => removeLink(link)}>X</Button> {link.name} - {link.url}</li>
            ))}
        </ul>

            <TextControl __nextHasNoMarginBottom={true} __next40pxDefaultSize={true} value={valueName} onChange={(newValue) => setValueName(newValue)} label="Title" />
            <TextControl __nextHasNoMarginBottom={true} __next40pxDefaultSize={true} value={valueUrl} onChange={(newValue) => setValueUrl(newValue)} label="URL" />
            <Button size="small" variant="secondary" onClick={addMetaValue} disabled={!(valueName && valueUrl)}>Add link</Button></>
    );
};