(function (w, d, $) {
    var WindowObject = $(w),
        DocumentObject = $(d),
        Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        EnvelopeObject;
    var EnvelopeStates = {
        Opened: 1,
        Closed: 2,
        Opening: 3,
        Closing: 4
    };
    $.fn.Envelope = function (o) {
        var Element = this,
            EnvelopeSection = $('#EnvelopeSection', d),
            EnvelopeBack = $('#EnvelopeBackSVG', Element),
            EnvelopeFront = $('#EnvelopeFrontSVG', Element),
            EnvelopeBackDoc,
            EnvelopeBackDocObject,
            EnvelopeBackRoot,
            EnvelopeFrontDoc,
            EnvelopeFrontDocObject,
            EnvelopeFrontRoot,
            BackLayer,
            Back,
            BackCoverLayer,
            BackCover,
            FrontCoverLayer,
            FrontCover,
            FrontLayer,
            Front,
            PageLayer,
            Page,
            SubmitLayer,
            SubmitTop,
            SubmitBottom,
            ShadowPolygon,
            ShadowPoints = {
                x1: 540,
                y1: 111,
                x2: 600,
                y2: 140,
                x3: 1000,
                y3: 350,
                x4: 1000,
                y4: 600,
                x5: 540,
                y5: 600
            },
            State = EnvelopeStates.Opened,
            Form = $('#Form', Element),
            Name = $('#Name', Form),
            NameTag = $('#NameTag', Form),
            Email = $('#Email', Form),
            EmailTag = $('#EmailTag', Form),
            Message = $('#Message', Form),
            MessageTag = $('#MessageTag', Form),
            MessageCount = $('#MessageCount', MessageTag),
            Loading = $('#Loading', Element),
            Done = $('#Done', Element),
            Fail = $('#Fail', Element),
            Posted = false,
            Options = $.extend({
                Width: 1366,
                Height: 500,
                HalfWidth: 683,
                HalfHeight: 250,
                FormAction: 'form.php',
                FormMethod: 'POST'
            }, o);
        var Functions = {
            ValidateName: function () {
                var Error = Name.val() == '';
                return Error;
            },
            ValidateEmail: function () {
                var Error = !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(Email.val()));
                return Error;
            },
            ValidateMessage: function () {
                var Error = Message.val() == '';
                return Error;
            },
            ValidateForm: function () {
                var Error = 0;
                Error = Error || Functions.ValidateName();
                Error = Error || Functions.ValidateEmail();
                Error = Error || Functions.ValidateMessage();
                return !Error;
            },
            ValidationResponse: function (Element, Flag) {
                if (Flag) {
                    TweenMax.to(Element, 0.5, {
                        borderColor: '#993333'
                    });
                } else {
                    TweenMax.to(Element, 0.5, {
                        borderColor: '#333333'
                    });
                }
            },
            TextBind: function (Element, ElementTag, ValidateFunction) {
                Element.on('focus', function () {
                    TweenMax.to(ElementTag, 0.5, {
                        scale: 0.7,
                        top: 15,
                        transformOrigin: '0% 0%',
                        ease: Power4.easeOut
                    });
                    TweenMax.to(Element, 0.5, {
                        opacity: 1,
                        ease: Power4.easeOut
                    });
                });
                Element.on('blur', function () {
                    if (Element.val() == '') {
                        TweenMax.to(ElementTag, 0.5, {
                            scale: 1,
                            top: 29,
                            transformOrigin: '0% 0%',
                            ease: Power4.easeOut
                        });
                    }
                    TweenMax.to(Element, 0.5, {
                        opacity: 0.8,
                        ease: Power4.easeOut
                    });
                });
                Element.on('keyup', function () {
                    Functions.ValidationResponse(Element, ValidateFunction());
                });
                Element.on('keydown', function () {
                    Functions.ValidationResponse(Element, ValidateFunction());
                });
            },
            TextAreaBind: function (Element, ElementTag, ElementCount) {
                var Max = parseInt(Element.attr('maxlength'));
                ElementCount.text('(' + Max + ')');
                Element.on('focus', function () {
                    TweenMax.to(ElementCount, 0.5, {
                        opacity: 1,
                        ease: Power4.easeOut
                    });
                });
                Element.on('blur', function () {
                    TweenMax.to(ElementCount, 0.5, {
                        opacity: 0,
                        ease: Power4.easeOut
                    });
                });
                Element.on('keydown', function () {
                    ElementCount.text('(' + (Max - Element.val().length) + ')');
                });
                Element.on('keyup', function () {
                    ElementCount.text('(' + (Max - Element.val().length) + ')');
                });
            },
            RePosition: function (Width, Height, HalfWidth) {
                Width = Width || w.innerWidth;
                Height = Height || w.innerHeight;
                HalfWidth = HalfWidth | Width / 2;
                Element.css({
                    top: Height - Options.Height,
                    left: HalfWidth - Options.HalfWidth
                });
                TweenMax.set(Element, {
                    transformOrigin: '50% 100%',
                    scale: Height < Options.Height ? Height / Options.Height : Width < Options.HalfWidth ? Width / Options.HalfWidth : 1
                });
                EnvelopeSection.css({
                    width: Width,
                    height: Height
                });
                return Functions;
            },
            ApplyShadow: function () {
                ShadowPolygon.attr('points', [ShadowPoints.x1, ',', ShadowPoints.y1, ' ',
                    ShadowPoints.x2, ',', ShadowPoints.y2, ' ',
                    ShadowPoints.x3, ',', ShadowPoints.y3, ' ',
                    ShadowPoints.x4, ',', ShadowPoints.y4, ' ',
                    ShadowPoints.x5, ',', ShadowPoints.y5].join(''));
                return Functions;
            },
            Loading: function (Count) {
                Count = Count || 2;
                TweenMax.to(Loading, 0.5, {
                    opacity: 0.9,
                    scale: 0.9,
                    transformOrigin: '50% 50%',
                    ease: Elastic.easeOut.config(10, 5),
                    onComplete: function () {
                        TweenMax.to(Loading, 0.5, {
                            opacity: 1,
                            scale: 1,
                            transformOrigin: '50% 50%',
                            ease: Elastic.easeOut.config(10, 5),
                            onComplete: function () {
                                Loading.html('Posting' + Array(Count).join("."));
                                if (Count > 3) Count = 2;
                                else Count++;
                                if (!Posted) {
                                    Functions.Loading(Count);
                                }
                            }
                        });
                    }
                });
            },
            SendMessage: function () {
                $.ajax({
                    method: Options.FormMethod,
                    url: Options.FormAction,
                    data: {
                        FullName: Name.val(),
                        Email: Email.val(),
                        Message: Message.val()
                    },
                    beforeSend: function () {
                        Posted = false;
                        TweenMax.fromTo(Loading, 0.5, {
                            display: 'block'
                        }, {
                            opacity: 1,
                            top: 190,
                            ease: Power4.easeOut,
                            onComplete: Functions.Loading
                        });
                    }
                }).done(function () {
                    Posted = true;
                    TweenMax.to(Loading, 0.5, {
                        opacity: 0,
                        top: 180,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            Loading.css({
                                display: 'none',
                                top: '200px'
                            });
                        }
                    });
                    TweenMax.fromTo(Done, 0.5, {
                        display: 'block'
                    }, {
                        opacity: 1,
                        top: 190,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            TweenMax.to(Done, 0.5, {
                                opacity: 0,
                                top: 180,
                                delay: 0.5,
                                ease: Power4.easeOut,
                                onComplete: function () {
                                    Done.css({
                                        display: 'none',
                                        top: '200px'
                                    });
                                    Functions.Open();
                                }
                            });
                        }
                    });
                }).fail(function () {
                    Posted = true;
                    TweenMax.to(Loading, 0.5, {
                        opacity: 0,
                        top: 180,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            Loading.css({
                                display: 'none',
                                top: '200px'
                            });
                        }
                    });
                    TweenMax.fromTo(Fail, 0.5, {
                        display: 'block'
                    }, {
                        opacity: 1,
                        top: 190,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            TweenMax.to(Fail, 0.5, {
                                opacity: 0,
                                top: 180,
                                delay: 0.5,
                                ease: Power4.easeOut,
                                onComplete: function () {
                                    Fail.css({
                                        display: 'none',
                                        top: '200px'
                                    });
                                    Functions.Open();
                                }
                            });
                        }
                    });
                });
            },
            Open: function () {
                State = EnvelopeStates.Opening;
                Functions.UnBind();
                Name.val('');
                TweenMax.to(NameTag, 0.5, {
                    scale: 1,
                    top: 29,
                    transformOrigin: '0% 0%',
                    ease: Power4.easeOut
                });
                Email.val('');
                TweenMax.to(EmailTag, 0.5, {
                    scale: 1,
                    top: 29,
                    transformOrigin: '0% 0%',
                    ease: Power4.easeOut
                });
                Message.val('').css('height', '38px');
                TweenMax.to(MessageTag, 0.5, {
                    scale: 1,
                    top: 29,
                    transformOrigin: '0% 0%',
                    ease: Power4.easeOut
                });
                TweenMax.to(Element, 1, {
                    opacity: 1,
                    y: 0,
                    ease: Power4.easeOut
                });
                TweenMax.to(FrontCover, 0.5, {
                    rotationX: 90,
                    transformOrigin: '50% 100%',
                    delay: 0.1,
                    fill: '#cccccc',
                    ease: Linear.easeNone,
                    onComplete: function () {
                        TweenMax.set(FrontCover, {
                            fill: '#999999'
                        });
                        TweenMax.fromTo(BackCover, 0.5, {
                            fill: '#888888'
                        }, {
                            fill: '#999999',
                            rotationX: 0,
                            transformOrigin: '50% 100%',
                            ease: Linear.easeNone
                        });
                    }
                });
                TweenMax.to(SubmitLayer, 0.5, {
                    opacity: 1,
                    y: 0,
                    delay: 0.25,
                    ease: Power4.easeOut
                });
                TweenMax.to(Page, 1, {
                    attr: {
                        y: 111
                    },
                    delay: 0.75,
                    ease: Power4.easeOut,
                    onComplete: function () {
                        State = EnvelopeStates.Opened;
                        Functions.Bind();
                        Functions.Hover();
                    },
                    onUpdate: function () {
                        ShadowPoints.y1 = parseInt($(this.target).attr('y'));
                        ShadowPoints.y2 = ShadowPoints.y1 < 200 ? ShadowPoints.y1 + 24 : 215;
                        ShadowPoints.y3 = ShadowPoints.y2 + 186;
                        Functions.ApplyShadow();
                    }
                });
                TweenMax.to(Form, 1, {
                    top: 125,
                    delay: 0.75,
                    ease: Power4.easeOut
                });
            },
            Close: function () {
                TweenMax.to(SubmitTop, 0.5, {
                    fill: '#808080',
                    ease: Power4.easeOut
                });
                TweenMax.to(SubmitBottom, 0.5, {
                    fill: '#808080',
                    ease: Power4.easeOut
                });
                if (Functions.ValidateForm()) {
                    State = EnvelopeStates.Closing;
                    TweenMax.to(SubmitLayer, 0.5, {
                        opacity: 0,
                        y: 100,
                        ease: Power4.easeOut
                    });
                    TweenMax.set(ShadowPolygon, {
                        y: 0
                    });
                    TweenMax.to(Form, 1, {
                        top: 306,
                        ease: Power4.easeOut
                    });
                    TweenMax.to(Page, 1, {
                        attr: {
                            y: 300
                        },
                        onUpdate: function () {
                            ShadowPoints.y1 = parseInt($(this.target).attr('y'));
                            ShadowPoints.y2 = ShadowPoints.y1 < 200 ? ShadowPoints.y1 + 24 : 215;
                            ShadowPoints.y3 = ShadowPoints.y2 + 186;
                            Functions.ApplyShadow();
                        },
                        ease: Power4.easeOut
                    });
                    TweenMax.to(BackCover, 1, {
                        rotationX: 90,
                        transformOrigin: '50% 100%',
                        fill: '#888888',
                        ease: Linear.easeOut,
                        onComplete: function () {
                            TweenMax.set(FrontCover, {
                                display: 'inline'
                            });
                            TweenMax.to(FrontCover, 0.5, {
                                rotationX: 180,
                                transformOrigin: '50% 100%',
                                ease: Power4.easeOut,
                                onComplete: function () {
                                    TweenMax.to(Element, 1, {
                                        y: 275,
                                        onComplete: function () {
                                            Functions.SendMessage();
                                        }
                                    });
                                    State = EnvelopeStates.Closed;
                                }
                            });
                        }
                    });
                } else {
                    if (Functions.ValidateName()) {
                        Functions.ValidationResponse(Name, true);
                    }
                    if (Functions.ValidateEmail()) {
                        Functions.ValidationResponse(Email, true);
                    }
                    if (Functions.ValidateMessage()) {
                        Functions.ValidationResponse(Message, true);
                    }
                }
            },
            SubmitHover: function () {
                if (State == EnvelopeStates.Opened) {
                    TweenMax.to(SubmitLayer, 0.5, {
                        y: -10,
                        ease: Power4.easeOut
                    });
                    TweenMax.to(SubmitTop, 0.5, {
                        fill: '#909090',
                        ease: Power4.easeOut
                    });
                    TweenMax.to(SubmitBottom, 0.5, {
                        fill: '#909090',
                        ease: Power4.easeOut
                    });
                }
            },
            SubmitDown: function () {
                if (State == EnvelopeStates.Opened) {
                    TweenMax.to(SubmitTop, 0.5, {
                        fill: '#747474',
                        ease: Power4.easeOut
                    });
                    TweenMax.to(SubmitBottom, 0.5, {
                        fill: '#747474',
                        ease: Power4.easeOut
                    });
                }
            },
            SubmitReset: function () {
                if (State == EnvelopeStates.Opened) {
                    TweenMax.to(SubmitLayer, 0.5, {
                        y: 0,
                        ease: Power4.easeOut
                    });
                    TweenMax.to(SubmitTop, 0.5, {
                        fill: '#808080',
                        ease: Power4.easeOut
                    });
                    TweenMax.to(SubmitBottom, 0.5, {
                        fill: '#808080',
                        ease: Power4.easeOut
                    });
                }
            },
            Hover: function () {
                if (State == EnvelopeStates.Opened) {
                    TweenMax.to(ShadowPolygon, 1, {
                        y: -111,
                        ease: Power4.easeOut
                    });
                    TweenMax.to(Page, 1, {
                        attr: {
                            y: 0
                        },
                        ease: Power4.easeOut
                    });
                    TweenMax.to(Form, 1, {
                        top: 14,
                        ease: Power4.easeOut
                    });
                }
            },
            Reset: function () {
                if (State == EnvelopeStates.Opened) {
                    TweenMax.to(ShadowPolygon, 1, {
                        y: 0,
                        ease: Power4.easeOut
                    });
                    TweenMax.to(Page, 1, {
                        attr: {
                            y: 111
                        },
                        ease: Power4.easeOut
                    });
                    TweenMax.to(Form, 1, {
                        top: 125,
                        ease: Power4.easeOut
                    });
                    Name.blur();
                    Email.blur();
                    Message.blur();
                }
            },
            Bind: function () {
                Form.on('mouseenter', Functions.Hover);
                Page.on('mouseleave', Functions.Reset);
                EnvelopeBack.on('mouseleave', Functions.Reset);
                Functions.TextBind(Name, NameTag, Functions.ValidateName);
                Functions.TextBind(Email, EmailTag, Functions.ValidateEmail);
                Functions.TextBind(Message, MessageTag, Functions.ValidateMessage);
                Functions.TextAreaBind(Message, MessageTag, MessageCount);
                EnvelopeFront.on('mouseenter', Functions.Reset);
                SubmitLayer.on('mouseover', Functions.SubmitHover);
                SubmitLayer.on('mousedown', Functions.SubmitDown);
                SubmitLayer.on('mouseup', Functions.Close);
                SubmitLayer.on('mouseout', Functions.SubmitReset);
                Message.elastic();
            },
            UnBind: function () {
                Form.unbind();
                Page.unbind();
                EnvelopeBack.unbind();
                Name.unbind();
                Email.unbind();
                Message.unbind();
                EnvelopeFront.unbind();
                SubmitLayer.unbind();
            }
        };
        EnvelopeBack.on('load', function () {
            EnvelopeBackDoc = EnvelopeBack[0].contentDocument;
            EnvelopeBackDocObject = $(EnvelopeBackDoc);
            EnvelopeBackRoot = EnvelopeBackDoc.documentElement;
            ShadowPolygon = $('#Shadow', EnvelopeBackRoot);
            BackLayer = $('#BackLayer', EnvelopeBackRoot);
            Back = $('#Back', BackLayer);
            BackCoverLayer = $('#CoverLayer', EnvelopeBackRoot);
            BackCover = $('#Cover', BackCoverLayer);
            PageLayer = $('#PageLayer', EnvelopeBackRoot);
            Page = $('#Page', PageLayer);
            TweenMax.set(Form, {
                top: 306
            });
            TweenMax.set(Page, {
                attr: {
                    y: 300
                }
            });
            TweenMax.set(BackCover, {
                rotationX: 90,
                transformOrigin: '50% 100%'
            });
            TweenMax.set(Element, {
                y: 275
            });
            ShadowPoints.y1 = 215;
            ShadowPoints.y2 = 215;
            ShadowPoints.y3 = 401;
            Functions.ApplyShadow();
        });
        EnvelopeFront.on('load', function () {
            EnvelopeFrontDoc = EnvelopeFront[0].contentDocument;
            EnvelopeFrontDocObject = $(EnvelopeFrontDoc);
            EnvelopeFrontRoot = EnvelopeFrontDoc.documentElement;
            FrontCoverLayer = $('#CoverLayer', EnvelopeFrontRoot);
            FrontCover = $('#Cover', FrontCoverLayer);
            FrontLayer = $('#FrontLayer', EnvelopeFrontRoot);
            Front = $('#Front', FrontLayer);
            SubmitLayer = $('#SubmitLayer', EnvelopeFrontRoot);
            SubmitTop = $('#SubmitTop', SubmitLayer);
            SubmitBottom = $('#SubmitBottom', SubmitLayer);
            TweenMax.set(FrontCover, {
                rotationX: 180,
                transformOrigin: '50% 100%'
            });
            TweenMax.set(SubmitLayer, {
                opacity: 0,
                y: 100
            });
        });
        return Functions;
    };
    DocumentObject.on('ready', function () {
        EnvelopeObject = $('#Envelope').Envelope({
            FormMethod: 'POST',
            FormAction: 'post.php'
        }).RePosition(Width, Height, HalfWidth);
        setTimeout(EnvelopeObject.Open, 1000);
    });
    WindowObject.on('resize', function () {
        Width = w.innerWidth;
        Height = w.innerHeight;
        HalfWidth = Width / 2;
        HalfHeight = Height / 2;
        EnvelopeObject.RePosition(Width, Height, HalfWidth);
    });
})(window, document, jQuery);
