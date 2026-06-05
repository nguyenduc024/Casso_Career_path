import { Facebook, Linkedin } from 'lucide-react';
import { useAppPreferences } from '../context/AppPreferences';
import { cassoLogoUrl } from '../cassoLogo';

const CASSO_HOME = 'https://casso.vn';
const CASSO_FACEBOOK = 'https://www.facebook.com/cassovn';
const CASSO_LINKEDIN =
  'https://www.linkedin.com/company/cassohq/posts/?feedView=all';

export function SiteFooter() {
  const { t } = useAppPreferences();
  const f = t.footer;

  return (
    <footer className="site-footer shrink-0 border-t border-cp bg-cp-bg print:hidden">
      <div className="site-footer-inner">
        <a
          href={CASSO_HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer-brand"
          aria-label={f.brandAria}
        >
          <img src={cassoLogoUrl} alt="" className="site-footer-logo" />
          <span className="font-brand text-[1.5rem] text-cp-primary tracking-wide">CASSO</span>
        </a>

        <div className="site-footer-block">
          <p className="site-footer-label">{f.hotlineLabel}</p>
          <a href="tel:19008144" className="site-footer-phone">
            1900 8144
          </a>
          <p className="site-footer-hours">{f.hotlineHours}</p>
        </div>

        <div className="site-footer-social">
          <a
            href={CASSO_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-social-btn"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" fill="currentColor" strokeWidth={0} />
          </a>
          <a
            href={CASSO_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-social-btn"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" fill="currentColor" strokeWidth={0} />
          </a>
        </div>

        <div className="site-footer-block">
          <p className="site-footer-tagline-title">{f.taglineTitle}</p>
          <p className="site-footer-desc">
            {f.descLead}
            <strong>{f.descBold}</strong>
            {f.descTail}
          </p>
        </div>

        <div className="site-footer-legal">
          <p>
            <strong>{f.companyName}</strong>
          </p>
          <p>{f.taxId}</p>
          <p>
            <strong>{f.addressLabel}</strong> {f.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
