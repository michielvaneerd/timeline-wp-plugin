import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelRow, TextControl, SelectControl, Button, ResponsiveWrapper, __experimentalText as Text, __experimentalVStack as VStack, __experimentalHStack as HStack, ToolbarButton, Popover, Card, CardBody, CheckboxControl } from '@wordpress/components';
import { useSelect, useDispatch, subscribe, select, dispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { MediaUpload, MediaUploadCheck, BlockControls, RichText } from '@wordpress/block-editor';
import { registerFormatType, toggleFormat, applyFormat } from '@wordpress/rich-text';
import { useState } from 'react';


wp.domReady(() => {
    let locked = false;
    subscribe(() => {
        const requiredMeta = select('core/editor').getEditedPostAttribute('meta');
        // const cat = select('core/editor').getEditedPostAttribute('mve_timeline');
        // console.log(cat);
        if (requiredMeta) {
            if (!requiredMeta.mve_timeline_year) {
                if (!locked) {
                    console.log('Lock');
                    locked = true;
                    dispatch('core/editor').lockPostSaving('requiredValueLock');
                }
            } else {
                if (locked) {
                    console.log('Unlock');
                    locked = false;
                    dispatch('core/editor').unlockPostSaving('requiredValueLock');
                }
            }
        }
    });
});

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

        const [linkName, setLinkName] = useState('');
        const [linkUrl, setLinkUrl] = useState('');

        const valueYear = meta['mve_timeline_year'] ?? '';
        const valueYearEnd = meta['mve_timeline_year_end'] ?? '';

        const updateYear = (newValue) => {
            if (newValue === '') {
                setMeta({ ...meta, mve_timeline_year: null });
            } else {
                newValue = parseInt(newValue, 10);
                setMeta({ ...meta, mve_timeline_year: !isNaN(newValue) ? newValue.toString() : null });
            }
        };

        const updateYearEnd = (newValue) => {
            if (newValue === '') {
                setMeta({ ...meta, mve_timeline_year_end: null });
            } else {
                newValue = parseInt(newValue, 10);
                setMeta({ ...meta, mve_timeline_year_end: !isNaN(newValue) ? newValue.toString() : null });
            }
        };

        const imageId = meta['mve_timeline_image'];
        const imageSource = meta['mve_timeline_image_source'] ?? '';
        const imageInfo = meta['mve_timeline_image_info'] ?? '';
        const intro = meta['mve_timeline_intro'];
        const hasContent = meta['mve_timeline_content'] ?? false;
        let links = meta['mve_timeline_links'];
        if (!links) {
            links = [];
        } else {
            links = JSON.parse(links); // [{"name": "", "url": ""}]
        }
        const addLink = () => {
            links.push({
                name: linkName,
                url: linkUrl
            });
            setMeta({ ...meta, mve_timeline_links: JSON.stringify(links) });
            setLinkName('');
            setLinkUrl('');
        };
        const removeLink = (valueToRemove) => {
            const newLinks = [];
            for (const val of links) {
                if (val.name === valueToRemove.name && val.url === valueToRemove.url) {

                } else {
                    newLinks.push(val);
                }
            }
            setMeta({ ...meta, mve_timeline_links: JSON.stringify(newLinks) });
        };


        const updateIntro = (newValue) => {
            setMeta({ ...meta, mve_timeline_intro: newValue });
        };

        const updateImageId = (newValue) => {
            const obj = { ...meta, mve_timeline_image: newValue ? newValue.id : null, mve_timeline_image_src: newValue ? newValue.url : null };
            if (!newValue) {
                obj.mve_timeline_image_source = null;
                obj.mve_timeline_image_info = null;
                obj.mve_timeline_image_src = null;
            }
            setMeta(obj);
        };

        const updateImageSource = (newValue) => {
            setMeta({ ...meta, mve_timeline_image_source: newValue });
        };

        const updateImageInfo = (newValue) => {
            setMeta({ ...meta, mve_timeline_image_info: newValue });
        };

        const updateHasContent = (newValue) => {
            setMeta({ ...meta, mve_timeline_content: newValue });
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

        const options = tags ? tags.map((tag) => {
            return {
                value: tag.id,
                label: tag.name
            };
        }) : [];

        const panelStyle = {
            backgroundColor: '#F3F3F3', padding: '.4rem', width: '100%'
        };

        return (
            <PluginDocumentSettingPanel title="MVE Timeline" initialOpen={true} name="mve_timeline_panel">
                <PanelRow>
                    <div style={panelStyle}>
                        <HStack>
                            <TextControl style={{ borderColor: !valueYear ? 'red' : '' }} onChange={updateYear} value={valueYear} label="Year start" />
                            <TextControl onChange={updateYearEnd} value={valueYearEnd} label="Year end" />
                        </HStack>
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <SelectControl label="Timeline" options={options} onChange={onChange} value={currentTags ? currentTags[0] : ''} />
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <CheckboxControl
                            label="Has content"
                            checked={hasContent}
                            onChange={updateHasContent}
                        />
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <VStack>
                            <MediaUploadCheck>
                                <Text upperCase={true}>Image</Text>
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
                                {image && <TextControl value={imageSource} onChange={updateImageSource} label="Source" />}
                                {image && <TextControl value={imageInfo} onChange={updateImageInfo} label="Info" />}
                            </MediaUploadCheck>
                        </VStack>
                    </div>
                </PanelRow>
                <PanelRow>
                <div style={panelStyle}><VStack>
                <Text upperCase={true}>Intro</Text>
                    <RichText style={{backgroundColor: 'white'}}
                        placeholder="Intro..."
                        allowedFormats={['core/bold', 'core/italic', 'mve-timeline/internal-link']}
                        label="MVE Timeline Intro"
                        value={intro}
                        onChange={updateIntro}
                    />
                    </VStack></div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <VStack>
                            <Text upperCase={true}>Links</Text>
                            <ul style={{ overflowX: 'auto', listStyleType: 'none', padding: 0, margin: 0 }}>
                                {links.map((link) => (
                                    <li key={link.url} style={{whiteSpace: 'nowrap'}}><Button isDestructive size="small" onClick={() => removeLink(link)}>X</Button> {link.name} - {link.url}</li>
                                ))}
                            </ul>
                            <TextControl value={linkName} onChange={(newValue) => setLinkName(newValue)} label="Title" />
                            <TextControl value={linkUrl} onChange={(newValue) => setLinkUrl(newValue)} label="URL" />
                            <Button size="small" variant="secondary" onClick={addLink} disabled={!(linkName && linkUrl)}>Add link</Button>
                        </VStack>
                    </div>
                </PanelRow>
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