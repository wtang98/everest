import React from "react";
import PublicSharpIcon from "@mui/icons-material/PublicSharp";
import BuildIcon from "@mui/icons-material/Build";
import AppShortcutSharpIcon from "@mui/icons-material/AppShortcutSharp";
import ContactButton from "../../components/contactButton/contactButton";
import apple from "../../assets/apple.svg.png";
import android from "../../assets/android.jpg";
import pwa from "../../assets/pwa.png";
import google from "../../assets/play.png";

import "./securities.scss";

const DownloadLinks = ({ text, icon, link }) => (
    <div className="download">
        <a target="_blank" href={link}>
            <button>
                <img className={icon} src={icon} />
                <div className="dowload__text">{text}</div>
            </button>
        </a>
    </div>
);

const Securities = ({ currentLanguage }) => {
    return (
        <div className="securities">
            <div className="securities__container">
                <div className="securities__container--landing">
                    <div className="securities__container--landing--img" />
                    <div className="securities__container--landing--title">
                        {
                            {
                                Eng: "Securities",
                                简体: "证券",
                                繁體: "證券",
                            }[currentLanguage]
                        }
                    </div>
                </div>
                <div className="securities__container--description">
                    <div className="content">
                        {
                            {
                                Eng: "Everest Securities Limited is a Hong Kong licensed securities firm authorized by the Securities and Futures Commission(SFC) to carry on Type 1 regulated activity dealing in securities under the Securities and Futures Ordinance(Cap. 571).",
                                简体: "Everest Securities Limited是一家持香港牌照的证券行，经证券及期货事务监察委员会（证监会）根据《证券及期货条例》（第571章）授权，从事第1类受规管活动（证券交易）。",
                                繁體: "Everest Securities Limited是一家持香港牌照的證券行，經證券及期貨事務監察委員會（證監會）根據《證券及期貨條例》（第571章）授權，從事第1類受規管活動（證券交易）。",
                            }[currentLanguage]
                        }
                        <br />
                    </div>
                    <div className="securities__container--description__buttons">
                        <ContactButton currentLanguage={currentLanguage} />
                    </div>
                </div>
                <div className="securities__container--tech">
                    <div className="title">
                        {
                            {
                                Eng: "Trade with us",
                                简体: "与我们交易",
                                繁體: "與我們交易",
                            }[currentLanguage]
                        }
                    </div>
                    <div className="text">
                        {
                            {
                                Eng: "Trade with us using Everest (Hong Kong) Securities Limited powered by Long Bridge.",
                                简体: "通过长桥支持的 Everest（香港）证券有限公司与我们进行交易。",
                                繁體: "透過長橋支援的 Everest（香港）證券有限公司與我們進行交易。",
                            }[currentLanguage]
                        }
                    </div>
                    <div className="securities__container--tech__links">
                        <div className="row">
                            <DownloadLinks
                                text="Apple Store"
                                icon={apple}
                                link="https://apps.apple.com/hk/app/longbridge-%E6%B8%AF%E8%82%A1-%E7%BE%8E%E8%82%A1-%E6%9C%9F%E6%AC%8A-etf-%E4%BA%A4%E6%98%93/id1470042146"
                            />
                            <DownloadLinks
                                text="Google Play"
                                icon={google}
                                link="https://m.lbkrs.com/v2/app/download-qrcode?channel=WHAB0002&os=Android&region=HK&download_source=google_play"
                            />
                        </div>
                        <div className="row">
                            <DownloadLinks
                                text="pwa"
                                icon={pwa}
                                link="https://longbridgeapp.com/"
                            />
                            <DownloadLinks
                                text="apk"
                                icon={android}
                                link="https://m.lbkrs.com/v2/app/download-qrcode?channel=WHAB0002&os=Android&region=HK"
                            />
                        </div>
                    </div>
                    <div className="securities__container--tech__info">
                        <div className="infoRow">
                            <AppShortcutSharpIcon color="inherit" />
                            <div>
                                <div className="infoRow__title">
                                    {
                                        {
                                            Eng: "Cutting Edge Tech",
                                            简体: "尖端科技",
                                            繁體: "尖端科技",
                                        }[currentLanguage]
                                    }
                                </div>
                                <div className="infoRow__info">
                                    {
                                        {
                                            Eng: "Low latency market data and trade execution intuative design and advanced trading tools make trading and management of assets from mobile or desktop simple.",
                                            简体: "低延迟市场数据与交易执行、直观设计和先进交易工具，让您通过移动设备或台式电脑轻松进行交易和管理资产。",
                                            繁體: "低延遲市場數據與交易執行、直觀設計和先進交易工具，讓您透過行動裝置或桌上型電腦輕鬆進行交易和管理資產。",
                                        }[currentLanguage]
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="infoRow">
                            <PublicSharpIcon />
                            <div>
                                <div className="infoRow__title">
                                    {
                                        {
                                            Eng: "Global Access",
                                            简体: "全球接入",
                                            繁體: "全球接入",
                                        }[currentLanguage]
                                    }
                                </div>
                                <div className="infoRow__info">
                                    {
                                        {
                                            Eng: "One account can connect to major exchanges in markets markets in Hong Kong, the United States, Singapore, Shanghai and Shenzhen markets, supporting stocks, ETFs, bonds, REITs, options, public funds, private equity funds, money market funds, etc., as well as OTC global securities market trading and other non-standard products trading.",
                                            简体: "一个账户即可连接香港、美国、新加坡及上海和深圳市场的主要交易所，支持股票、交易所交易基金、债券、房地产投资信托基金、期权、公募基金、私募基金、货币市场基金等产品，并可参与场外全球证券市场交易及其他非标准化产品交易。",
                                            繁體: "一個帳戶即可連接香港、美國、新加坡及上海和深圳市場的主要交易所，支援股票、交易所買賣基金、債券、房地產投資信託基金、期權、公募基金、私募基金、貨幣市場基金等產品，並可參與場外全球證券市場交易及其他非標準化產品交易。",
                                        }[currentLanguage]
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="infoRow">
                            <div></div>
                            <BuildIcon />
                            <div>
                                <div className="infoRow__title">
                                    {
                                        {
                                            Eng: "Extensive Investor Tools",
                                            简体: "丰富的投资者工具",
                                            繁體: "豐富的投資者工具",
                                        }[currentLanguage]
                                    }
                                </div>
                                <div className="infoRow__info">
                                    {
                                        {
                                            Eng: "Financial overviews provide financial scores, in-depth data, business reviews, institutaion ratings, industry data amongst other information points to help investors identify potential opportunities.",
                                            简体: "财务概览提供财务评分、深度数据、商业评论、机构评级、行业数据等多维度信息，帮助投资者发掘潜在机遇。",
                                            繁體: "財務概覽提供財務評分、深度數據、商業評論、機構評級、行業數據等多維度信息，幫助投資者發掘潛在機遇。",
                                        }[currentLanguage]
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="securities__container--fees">
                    <div className="title">
                        {
                            {
                                Eng: "Fees ",
                                简体: "收费",
                                繁體: "與我們交易",
                            }[currentLanguage]
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Securities;
