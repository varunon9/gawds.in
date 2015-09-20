(function (w, d, $) {
    var WindowObject = $(w),
        DocumentObject = $(d),
        Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        StartPageObject;
    $.fn.StartPage = function (o) {
        var Element = this,
            SVG = $('#StartPageSVG', Element),
            SVGDoc,
            SVGDocObject,
            SVGRoot,
            SVGRootObject,
            DotLayer,
            Dot,
            DotBlip,
            LineBottom,
            LineTop,
            WeLayer,
            WeLayerElements,
            WeLayerElementsCount,
            CreateLayer,
            CreateLayerElements,
            CreateLayerElementsCount,
            DesignLayer,
            DesignLayerElements,
            DesignLayerElementsCount,
            PHPLayer,
            PHPLayerElements,
            PHPLayerElementsCount,
            HTMLLayer,
            HTMLLayerElements,
            HTMLLayerElementsCount,
            DevelopLayer,
            DevelopLayerElements,
            DevelopLayerElementsCount,
            CursorLayer,
            CursorGroup,
            Cursor,
            DotsLayer,
            TextLayer,
            GAWDS,
            Dots = [],
            NumberOfDots = 50,
            DotPositionWidth,
            DotPositionHalfWidth,
            DotPositionHeight,
            DotPositionHalfHeight,
            StopGAWDSFlag = false,
            random = Math.random,
            Options = $.extend({
                Width: w.innerWidth,
                Height: w.innerHeight,
                HalfWidth: w.innerWidth / 2,
                HalfHeight: w.innerHeight / 2,
                DotScale: 0.25,
                DotUpScale: 0.5,
                DotBlipInScale: 2.5,
                DotBlipOutScale: 5,
                CallBack: undefined,
                Speed: 1.5
            }, o);
        DotPositionWidth = Options.Width - 350;
        DotPositionHalfWidth = Options.HalfWidth - 200;
        DotPositionHeight = Options.Height - 150;
        DotPositionHalfHeight = Options.HalfHeight - 100;
        var Functions = {
            Blip: function (Count, Callback) {
                var DotScale = Options.DotScale,
                    DotUpScale = Options.DotUpScale,
                    DotBlipInScale = Options.DotBlipInScale,
                    DotBlipOutScale = Options.DotBlipOutScale,
                    Speed = Options.Speed;
                TweenMax.fromTo(Dot, 0.35 / Speed, {
                    scale: DotScale,
                    transformOrigin: '50% 50%'
                }, {
                    scale: DotUpScale,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut,
                    onComplete: function () {
                        TweenMax.fromTo(Dot, 0.35 / Speed, {
                            scale: DotUpScale,
                            transformOrigin: '50% 50%'
                        }, {
                            scale: DotScale,
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut
                        });
                    }
                });
                TweenMax.fromTo(DotBlip, 0.35 / Speed, {
                    opacity: 0,
                    scale: 0
                }, {
                    opacity: 1,
                    scale: DotBlipInScale,
                    transformOrigin: '50% 50%',
                    ease: Linear.easeOut,
                    onComplete: function () {
                        TweenMax.fromTo(DotBlip, 0.35 / Speed, {
                            opacity: 1,
                            scale: DotBlipInScale,
                            transformOrigin: '50% 50%'
                        }, {
                            opacity: 0,
                            scale: DotBlipOutScale,
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut,
                            onComplete: Count < 1 ? function () {
                                Count++;
                                Functions.Blip(Count, Callback);
                            } : Callback
                        });
                    }
                });
            },
            ElementsAnimation: function (Elements, ElementsCount, Time, Delay, ElementDelay, From, To, Invert, CallBack) {
                Invert = Invert || 0;
                var Index = 0,
                    Limit = ElementsCount - 1;
                if (Invert) {
                    Index = Limit;
                    for (; Index >= 0; Index--) {
                        TweenMax.fromTo(Elements[Index], Time, From, $.extend(To, {
                            delay: ElementDelay * Index + Delay,
                            onComplete: function () {
                                if (parseInt($(this.target).attr('count')) == 0) {
                                    if (CallBack != undefined) CallBack();
                                }
                            }
                        }));
                    }
                } else {
                    for (; Index < ElementsCount; Index++) {
                        TweenMax.fromTo(Elements[Index], Time, From, $.extend(To, {
                            delay: ElementDelay * Index + Delay,
                            onComplete: function () {
                                if (parseInt($(this.target).attr('count')) == Limit) {
                                    if (CallBack != undefined) CallBack();
                                }
                            }
                        }));
                    }
                }
                return Functions;
            },
            CursorAnimation: function (Count, Total, Duration, Delay) {
                Count = Count || 0;
                TweenMax.fromTo(CursorGroup, Duration, {
                    fillOpacity: 1,
                    x: Count * 51
                }, {
                    x: (Count + 1) * 51,
                    delay: Delay,
                    onComplete: Count < Total ? function () {
                        Functions.CursorAnimation(++Count, Total, Duration, Delay);
                    } : undefined
                });
            },
            CursorBlipAnimation: function (Duration, CallBack) {
                Duration = Duration || 0.5 / Options.Speed;
                TweenMax.fromTo(CursorGroup, Duration, {
                    fillOpacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%'
                }, {
                    fillOpacity: 0.2,
                    scale: 0.8,
                    transformOrigin: '50% 50%',
                    onComplete: function () {
                        TweenMax.fromTo(CursorGroup, Duration, {
                            fillOpacity: 0.2,
                            scale: 0.8,
                            transformOrigin: '50% 50%'
                        }, {
                            fillOpacity: 1,
                            scale: 1,
                            transformOrigin: '50% 50%',
                            onComplete: function () {
                                TweenMax.fromTo(CursorGroup, Duration, {
                                    fillOpacity: 1
                                }, {
                                    fillOpacity: 0,
                                    onComplete: CallBack
                                });
                            }
                        });
                    }
                });
            },
            Start: function () {
                var DotScale = Options.DotScale,
                    Speed = Options.Speed;
                TweenMax.fromTo(Dot, 1 / Speed, {
                    fillOpacity: 0,
                    scale: 0
                }, {
                    fillOpacity: 1,
                    scale: DotScale,
                    transformOrigin: '50% 50%',
                    delay: 0.25,
                    ease: Elastic.easeOut,
                    onComplete: function () {
                        Functions.Blip(0, function () {
                            TweenMax.fromTo(Dot, 1 / Speed, {
                                fillOpacity: 1,
                                scale: DotScale,
                                transformOrigin: '50% 50%'
                            }, {
                                fillOpacity: 0,
                                scale: 0,
                                transformOrigin: '50% 50%',
                                ease: Elastic.easeOut.config(10, 10)
                            });
                            TweenMax.to(LineBottom, 1 / Speed, {
                                fillOpacity: 1,
                                attr: {
                                    width: 564,
                                    x: 150
                                },
                                ease: Elastic.easeOut.config(10, 10),
                                onComplete: function () {
                                    TweenMax.to(LineBottom, 1 / Speed, {
                                        attr: {
                                            y: 256
                                        },
                                        ease: Elastic.easeOut.config(10, 10)
                                    });
                                    TweenMax.fromTo(LineTop, 1 / Speed, {
                                        fillOpacity: 1,
                                        attr: {
                                            width: 564,
                                            y: 227
                                        }
                                    }, {
                                        attr: {
                                            y: 196
                                        },
                                        ease: Elastic.easeOut.config(10, 10)
                                    });
                                    TweenMax.to(WeLayer, 1 / Speed, {
                                        opacity: 1,
                                        ease: Power4.easeOut,
                                        delay: 0.1
                                    });
                                    Functions.ElementsAnimation(CreateLayerElements, CreateLayerElementsCount, 1 / Speed, 0, 0.1 / Speed, {
                                        x: -10,
                                        rotationX: -90,
                                        transformOrigin: '50% 50%'
                                    }, {
                                        x: 10,
                                        rotationX: 0,
                                        fillOpacity: 1,
                                        transformOrigin: '50% 50%',
                                        ease: Elastic.easeOut
                                    }, 0, function () {
                                        Functions.ElementsAnimation(CreateLayerElements, CreateLayerElementsCount, 0.75 / Speed, 0, 0.1 / Speed, {
                                            rotationX: 0,
                                            transformOrigin: '50% 50%'
                                        }, {
                                            rotationX: 360,
                                            fillOpacity: 0,
                                            transformOrigin: '50% 50%',
                                            ease: Bounce.easeOut
                                        }, 0);
                                        Functions.ElementsAnimation(DesignLayerElements, DesignLayerElementsCount, 0.75 / Speed, 0, 0.1 / Speed, {
                                            scale: 1,
                                            rotationX: 360,
                                            fillOpacity: 0,
                                            transformOrigin: '50% 50%'
                                        }, {
                                            rotationX: 0,
                                            fillOpacity: 1,
                                            transformOrigin: '50% 50%',
                                            ease: Bounce.easeOut
                                        }, 0, function () {
                                            Functions.ElementsAnimation(DesignLayerElements, DesignLayerElementsCount, 0.75 / Speed, 0, 0.1 / Speed, {
                                                scale: 1,
                                                fillOpacity: 1,
                                                transformOrigin: '50% 50%'
                                            }, {
                                                scale: 1.5,
                                                fillOpacity: 0,
                                                transformOrigin: '50% 50%',
                                                ease: Elastic.easeOut.config(10, 10)
                                            }, 0);
                                            TweenMax.fromTo(CursorGroup, 0.1 / Speed, {
                                                fillOpacity: 0
                                            }, {
                                                fillOpacity: 1,
                                                delay: 0.1,
                                                onComplete: function () {
                                                    Functions.CursorBlipAnimation(0.1 / Speed, function () {
                                                        Functions.CursorAnimation(0, 7, 0.1 / Speed, 0);
                                                        Functions.ElementsAnimation(PHPLayerElements, PHPLayerElementsCount, 0.1 / Speed, 0, 0.15 / Speed, {
                                                            fillOpacity: 0,
                                                            scale: 0.8,
                                                            transformOrigin: '50% 50%',
                                                            x: -5
                                                        }, {
                                                            fillOpacity: 1,
                                                            scale: 1,
                                                            transformOrigin: '50% 50%',
                                                            x: 0,
                                                            ease: Linear.easeNone
                                                        }, 0, function () {
                                                            Functions.CursorBlipAnimation(0.1 / Speed, function () {
                                                                Functions.ElementsAnimation(PHPLayerElements, PHPLayerElementsCount, 0.1 / Speed, 0, 0.15 / Speed, {
                                                                    fillOpacity: 1,
                                                                    scale: 1,
                                                                    transformOrigin: '50% 50%',
                                                                    x: 0
                                                                }, {
                                                                    fillOpacity: 0,
                                                                    scale: 0.8,
                                                                    transformOrigin: '50% 50%',
                                                                    x: 5,
                                                                    ease: Linear.easeNone
                                                                }, 1, function () {
                                                                    Functions.CursorAnimation(0, 7, 0.1 / Speed, 0);
                                                                    Functions.ElementsAnimation(HTMLLayerElements, HTMLLayerElementsCount, 0.1 / Speed, 0, 0.15 / Speed, {
                                                                        fillOpacity: 0,
                                                                        scale: 0.8,
                                                                        transformOrigin: '50% 50%',
                                                                        x: -5
                                                                    }, {
                                                                        fillOpacity: 1,
                                                                        scale: 1,
                                                                        transformOrigin: '50% 50%',
                                                                        x: 0,
                                                                        ease: Linear.easeNone
                                                                    }, 0, function () {
                                                                        Functions.CursorBlipAnimation(0.1 / Speed, function () {
                                                                            Functions.ElementsAnimation(HTMLLayerElements, HTMLLayerElementsCount, 0.1 / Speed, 0, 0.15 / Speed, {
                                                                                fillOpacity: 1,
                                                                                scale: 1,
                                                                                transformOrigin: '50% 50%',
                                                                                x: 0
                                                                            }, {
                                                                                fillOpacity: 0,
                                                                                scale: 0.8,
                                                                                transformOrigin: '50% 50%',
                                                                                x: 5,
                                                                                ease: Linear.easeNone
                                                                            }, 1, function () {
                                                                                Functions.CursorAnimation(0, 7, 0.1 / Speed, 0);
                                                                                Functions.ElementsAnimation(DevelopLayerElements, DevelopLayerElementsCount, 0.1 / Speed, 0, 0.15 / Speed, {
                                                                                    fillOpacity: 0,
                                                                                    scale: 0.8,
                                                                                    transformOrigin: '50% 50%',
                                                                                    x: -5
                                                                                }, {
                                                                                    fillOpacity: 1,
                                                                                    scale: 1,
                                                                                    transformOrigin: '50% 50%',
                                                                                    x: 0,
                                                                                    ease: Linear.easeNone
                                                                                }, 0, function () {
                                                                                    Functions.CursorBlipAnimation(0.1 / Speed, Functions.Close);
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
                return Functions;
            },
            Close: function () {
                var Speed = Options.Speed;
                setTimeout(function () {
                    TweenMax.to(DevelopLayer, 0.75 / Speed, {
                        opacity: 0,
                        scale: 0.8,
                        transformOrigin: '50% 50%',
                        ease: Elastic.easeOut.config(10, 10),
                        onComplete: function () {
                            DevelopLayer.css('opacity', 1);
                            DevelopLayerElements.css('fill-opacity', 0);
                        }
                    });
                    TweenMax.to(WeLayer, 0.75 / Speed, {
                        opacity: 0,
                        scale: 0.8,
                        transformOrigin: '50% 50%',
                        ease: Elastic.easeOut.config(10, 10)
                    });
                    TweenMax.to(LineBottom, 0.75 / Speed, {
                        attr: {
                            y: 227
                        },
                        delay: 0.25,
                        ease: Elastic.easeOut.config(10, 10)
                    });
                    TweenMax.to(LineTop, 0.75 / Speed, {
                        attr: {
                            y: 227
                        },
                        delay: 0.25,
                        ease: Elastic.easeOut.config(10, 10),
                        onComplete: function () {
                            LineTop.css('fill-opacity', 0);
                            TweenMax.to(LineBottom, 0.5 / Speed, {
                                fillOpacity: 0,
                                attr: {
                                    width: 10,
                                    x: 410
                                },
                                ease: Power4.easeOut
                            });
                            TweenMax.fromTo(Dot, 1 / Speed, {
                                scale: Options.DotUpScale,
                                transformOrigin: '50% 50%'
                            }, {
                                fillOpacity: 1,
                                fill: '#00BEBE',
                                scale: Options.DotScale,
                                transformOrigin: '50% 50%',
                                ease: Elastic.easeOut
                            });
                            TweenMax.fromTo(DotBlip, 0.35 / Speed, {
                                opacity: 0,
                                scale: 0
                            }, {
                                opacity: 1,
                                scale: Options.DotBlipInScale,
                                transformOrigin: '50% 50%',
                                ease: Linear.easeOut,
                                delay: 0.15 / Speed,
                                onComplete: function () {
                                    TweenMax.fromTo(DotBlip, 0.35 / Speed, {
                                        opacity: 1,
                                        scale: Options.DotBlipInScale
                                    }, {
                                        opacity: 0,
                                        scale: Options.DotBlipOutScale,
                                        transformOrigin: '50% 50%',
                                        ease: Power4.easeOut,
                                        onComplete: Functions.StartGAWDS
                                    });
                                }
                            });
                        }
                    });
                }, 500 / Speed);
            },
            CreateDots: function () {
                var i = 0,
                    Dot,
                    DotScale = Options.DotScale;
                for (; i < NumberOfDots; i++) {
                    Dot = d.createElementNS('http://www.w3.org/2000/svg', 'path');
                    Dot.setAttribute('d', 'm439 240a12 12 0 0 1-12 12 12 12 0 0 1-12-12 12 12 0 0 1 12-12 12 12 0 0 1 12 12z');
                    Dot.style.fill = '#ccc';
                    Dot.style.filter = 'url(#Color)';
                    Dot.style.stroke = 'none';
                    Dot.style.fillOpacity = 0;
                    Dots.push($(Dot).appendTo(DotsLayer));
                    TweenMax.set(Dots[i], {
                        scale: DotScale,
                        x: -3,
                        y: -3
                    });
                }
            },
            DotAnimation: function (Element, Duration) {
                var Offest = random() * 100 - 50;
                TweenMax.to(Element, Duration, {
                    fillOpacity: random() * 0.4 + 0.04,
                    scale: random() * 5 + 1,
                    x: parseInt(Element.attr('x')) + Offest,
                    y: parseInt(Element.attr('y')) + Offest,
                    ease: Linear.easeNone,
                    onComplete: StopGAWDSFlag ? undefined : function () {
                        Functions.DotAnimation(Element, Duration);
                    }
                });
            },
            GAWDSAnimation: function () {
                TweenMax.to(GAWDS, 200, {
                    scale: 2.65,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut,
                    onComplete: function () {
                        TweenMax.to(GAWDS, 100, {
                            scale: 2,
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut,
                            onComplete: StopGAWDSFlag ? undefined : Functions.GAWDSAnimation
                        });
                    }
                });
            },
            StartGAWDS: function () {
                Functions.CreateDots();
                var i = 0,
                    Duration = 0.1,
                    X,
                    Y,
                    CurrentDot;
                //Duration = 1 / Options.Speed;
                for (; i < NumberOfDots; i++) {
                    CurrentDot = Dots[i];
                    X = random() * DotPositionWidth - DotPositionHalfWidth;
                    Y = random() * DotPositionHeight - DotPositionHalfHeight;
                    CurrentDot.attr({
                        x: X,
                        y: Y
                    });
                    TweenMax.to(CurrentDot, Duration, {
                        transformOrigin: '50% 50%',
                        scale: random() * 5 + 1,
                        x: X,
                        y: Y,
                        fillOpacity: random() * 0.4 + 0.04,
                        ease: Power4.easeOut,
                        delay: Duration * i,
                        onComplete: function () {
                            Functions.DotAnimation(this.target, 15);
                        }
                    });
                }
                TweenMax.to(Dot, 0.1 * NumberOfDots, {
                    transformOrigin: '50% 50%',
                    scale: 6,
                    ease: Linear.easeOut,
                    onComplete: function () {
                        TweenMax.to(Dot, 1, {
                            transformOrigin: '50% 50%',
                            scale: 48,
                            ease: Power4.easeOut
                        });
                        TweenMax.to(Dot, 2.5, {
                            fillOpacity: 0,
                            delay: 0.5,
                            ease: Power4.easeOut
                        });
                        TweenMax.to(GAWDS, 1.5, {
                            fillOpacity: 1,
                            scale: 2,
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut,
                            delay: 0.5,
                            onComplete: Functions.GAWDSAnimation
                        });
                        TweenMax.fromTo(DotBlip, 1.5, {
                            opacity: 1,
                            scale: 0
                        }, {
                            scale: 36,
                            transformOrigin: '50% 50%',
                            opacity: 0,
                            ease: Power4.easeOut,
                            delay: 0.5
                        });
                    }
                });
            },
            Resize: function (Width, Height) {
                Width = Width || Options.Width;
                Height = Height || Options.Height;
                Options.Width = Width;
                Options.Height = Height;
                var Size = {
                    width: Width,
                    height: Height
                };
                Element.attr(Size);
                SVG.attr(Size);
                SVGRootObject.attr(Size);
                return Functions;
            }
        };
        SVG.on('load', function () {
            SVGDoc = SVG[0].contentDocument;
            SVGDocObject = $(SVGDoc);
            SVGRoot = SVGDoc.documentElement;
            SVGRootObject = $(SVGRoot);
            DotLayer = $('#DotLayer', SVGRoot);
            Dot = $('#Dot', DotLayer);
            DotBlip = $('#DotBlip', DotLayer);
            LineBottom = $('#LineBottom', DotLayer);
            LineTop = $('#LineTop', DotLayer);
            WeLayer = $('#WeLayer', SVGRoot);
            WeLayerElements = WeLayer.find('g');
            WeLayerElementsCount = WeLayerElements.length;
            CreateLayer = $('#CreateLayer', SVGRoot);
            CreateLayerElements = CreateLayer.find('g');
            CreateLayerElementsCount = CreateLayerElements.length;
            DesignLayer = $('#DesignLayer', SVGRoot);
            DesignLayerElements = DesignLayer.find('g');
            DesignLayerElementsCount = DesignLayerElements.length;
            PHPLayer = $('#PHPLayer', SVGRoot);
            PHPLayerElements = PHPLayer.find('g');
            PHPLayerElementsCount = PHPLayerElements.length;
            HTMLLayer = $('#HTMLLayer', SVGRoot);
            HTMLLayerElements = HTMLLayer.find('g');
            HTMLLayerElementsCount = HTMLLayerElements.length;
            DevelopLayer = $('#DevelopLayer', SVGRoot);
            DevelopLayerElements = DevelopLayer.find('g');
            DevelopLayerElementsCount = DevelopLayerElements.length;
            CursorLayer = $('#CursorLayer', SVGRoot);
            CursorGroup = $('#CursorGroup', SVGRoot);
            Cursor = $('#Cursor', CursorGroup);
            DotsLayer = $('#DotsLayer', DotLayer);
            TextLayer = $('#TextLayer', SVGRoot);
            GAWDS = $('#GAWDS', TextLayer);
            Functions.Resize().Start();
        });
        return Functions;
    };
    DocumentObject.on('ready', function () {
        StartPageObject = $('#StartPage').StartPage({
            Width: Width,
            Height: Height,
            HalfWidth: HalfWidth,
            HalfHeight: HalfHeight
        });
    });
    WindowObject.on('resize', function () {
        Width = w.innerWidth;
        Height = w.innerHeight;
        HalfWidth = Width / 2;
        HalfHeight = Height / 2;
        StartPageObject.Resize(Width, Height);
    });
})(window, document, jQuery);