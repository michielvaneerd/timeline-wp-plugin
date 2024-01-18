import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelRow, TextControl, SelectControl, Button, ResponsiveWrapper, __experimentalText as Text, __experimentalVStack as VStack, ToolbarButton, Popover, Card, CardBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { registerFormatType, toggleFormat, applyFormat } from '@wordpress/rich-text';
import { useState } from 'react';



registerPlugin('mve-timeline', {
    render: function () {

        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const postId = useSelect(
            (select) => select('core/editor').getCurrentPostId(),
            []
        );

        const { editEntityRecord } = useDispatch('core');

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        const year = meta['mve_timeline_year'];
        const imageId = meta['mve_timeline_image'];
        const imageSource = meta['mve_timeline_image_source'] ?? '';

        const updateYear = (newValue) => {
            newValue = parseInt(newValue, 10);
            setMeta({ ...meta, mve_timeline_year: !isNaN(newValue) ? newValue : 0 });
        };

        const updateImageId = (newValue) => {
            const obj = { ...meta, mve_timeline_image: newValue ? newValue.id : null };
            if (!newValue) {
                obj.mve_timeline_image_source = null;
            }
            setMeta(obj);
        };

        const updateImageSource = (newValue) => {
            setMeta({ ...meta, mve_timeline_image_source: newValue });
        };

        const tags = useSelect((select) => {
            return select('core').getEntityRecords('taxonomy', 'mve_timeline', { orderBy: 'name', 'order': 'asc', 'per_page': -1 }); // name and slug
        });

        const currentTags = useSelect(
            (select) => select('core/editor').getEditedPostAttribute('mve_timeline'),
            []
        );

        function onChange(value) {
            value = parseInt(value, 10);
            editEntityRecord('postType', 'mve_timeline_item', postId, {
                'mve_timeline': !isNaN(value) ? [parseInt(value, 10)] : [0]
            });
        }

        const image = useSelect((select) => select('core').getMedia(imageId), [imageId]);

        const options = [{
            value: 0,
            label: 'Choose timeline...'
        }].concat(tags ? tags.map((tag) => {
            return {
                value: tag.id,
                label: tag.name
            };
        }) : []);

        return (
            <PluginDocumentSettingPanel title="MVE Timeline" initialOpen={true}>

                <PanelRow>
                    <TextControl
                        label="MVE Timeline Year"
                        value={year}
                        onChange={updateYear}
                    />
                </PanelRow>
                <PanelRow>
                    <SelectControl label="Timeline" options={options} onChange={onChange} value={currentTags ? currentTags[0] : ''} />
                </PanelRow>
                <PanelRow><VStack>
                    <MediaUploadCheck>
                        <div style={{ display: 'block' }}><Text upperCase={true}>Image</Text></div>

                        <MediaUpload
                            onSelect={updateImageId}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (<>
                                {image && <div style={{ display: 'block' }}><ResponsiveWrapper naturalWidth={image.media_details.width}
                                    naturalHeight={image.media_details.height}><img src={image.source_url} /></ResponsiveWrapper></div>}
                                <div style={{ display: 'block' }}>
                                    {!image && <Button variant="secondary" onClick={open}>Open Media Library</Button>}
                                    {image && <Button onClick={() => updateImageId(null)} isLink isDestructive>Remove image</Button>}
                                </div>

                            </>
                            )}
                        />

                    </MediaUploadCheck>
                    { image && <TextControl value={imageSource} onChange={updateImageSource} label="Image source" /> }
                </VStack></PanelRow>


            </PluginDocumentSettingPanel>
        );
    }
});

const MyPageList = ({ pages, onChange, value }) => {
    return <SelectControl style={{ minWidth: '300px' }} __nextHasNoMarginBottom value={value} label="Select page" onChange={onChange} options={pages.map(function (page) {
        return { value: page.id, label: `${page.meta.mve_timeline_year} - ${page.title.raw}` };
    })} />
};

const MyCustomButton = ({ isActive, onChange, value, activeAttributes, contentRef }) => {

    const [popoverAnchor, setPopoverAnchor] = useState(contentRef.current);
    const allowedBlocks = ['core/paragraph', 'mve-timeline/intro'];

    const postId = useSelect(
        (select) => select('core/editor').getCurrentPostId(),
        []
    );

    const selectedBlock = useSelect((select) => {
        return select('core/block-editor').getSelectedBlock();
    }, []);

    if (selectedBlock && !allowedBlocks.includes(selectedBlock.name)) {
        return null;
    }

    const currentTags = useSelect(
        (select) => select('core/editor').getEditedPostAttribute('mve_timeline'),
        []
    );

    const pages = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'mve_timeline_item', currentTags && postId ? {
            'mve_timeline': currentTags,
            'exclude': [postId]
        } : {});
    }, [currentTags, postId]);

    return (
        <BlockControls>
            <ToolbarButton
                icon="admin-links"
                title="Internal link"
                onClick={() => {
                    onChange(
                        toggleFormat(value, {
                            type: 'mve-timeline/internal-link',
                        })
                    );
                }}
                isActive={isActive}
            />
            {isActive && pages && <Popover anchor={popoverAnchor} variant="toolbar"><Card><CardBody>
                <MyPageList pages={pages} value={activeAttributes?.name} onChange={(newValue) => {
                    const changed = applyFormat(value, {
                        type: 'mve-timeline/internal-link',
                        attributes: {
                            name: newValue
                        }
                    });
                    onChange(changed);
                }} />
            </CardBody></Card>
            </Popover>}
        </BlockControls>
    );
};

// const MyCustomButton2 = ({ isActive, onChange, value, activeAttributes }) => {

//     const selectedBlock = useSelect((select) => {
//         return select('core/block-editor').getSelectedBlock();
//     }, []);

//     if (selectedBlock && selectedBlock.name !== 'core/paragraph') {
//         return null;
//     }

//     console.log(selectedBlock.name);

//     return (
//         <BlockControls>
//             <ToolbarButton
//                 icon="editor-code"
//                 title="Sample output"
//                 onClick={() => {
//                     onChange(
//                         toggleFormat(value, {
//                             type: 'my-custom-format/sample-output',
//                         })
//                     );
//                 }}
//                 isActive={isActive}
//             />
//             {isActive && <Popover variant="toolbar">
//                 <URLInput value={activeAttributes.name ?? ''} onChange={(url, post) => {
//                     const newVal = applyFormat(value, {
//                         type: 'my-custom-format/sample-output',
//                         attributes: {
//                             name: url
//                         }
//                     });
//                     console.log(newVal);
//                     console.log(url);
//                     console.log(post);
//                     onChange(newVal);
//                 }} />
//             </Popover>}
//         </BlockControls>
//     );
// };

registerFormatType('mve-timeline/internal-link', {
    title: 'Internal link',
    tagName: 'a',
    className: 'mve-internal-link',
    attributes: {
        name: 'data-internal-id',
    },
    edit: MyCustomButton
});

//addFilter('editor.BlockEdit', 'mve-timeline/link', InternalLink);