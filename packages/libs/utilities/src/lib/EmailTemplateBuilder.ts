import { EmailSection, EmailLink } from '@opentech-radar/types';

export const buildEmail = (sections: EmailSection[]) => {
  const sectionHtml = sections.map((section) =>
    buildSection(section.header, section.links)
  );

  return `<div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        <table role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">

      <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

      <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">

            <tbody>
            ${buildPageHeader()}
            <tr>
              <td style="font-size:0px;padding:14px 10px;padding-top:14px;padding-right:10px;padding-bottom:14px;word-break:break-word;">
      <p style="font-family: Bitter, Georgia, serif; color: #0A0A0A; border-top: solid 2px #000000; font-size: 1; margin: 0px auto; width: 100%;">
      </p>
              </td>
            </tr>
            ${sectionHtml}
       </tbody>
      </table>
      </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>`;
};

const buildPageHeader = () => {
  let today = new Date().toLocaleDateString();

  return `<tr>
              <td style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;" align="left">

      <div style="font-family:Bitter, Georgia, serif;font-size:15px;line-height:1.5;text-align:left;color:#000000;"><h1 style="font-family: 'Cabin', sans-serif; font-size: 22px; color: #ad5152; text-align: center;">Radar Hits for ${today}</h1></div>

              </td>
            </tr>`;
};

const buildSection = (header: string, links: EmailLink[]) => {
  let linkHtml = links
    .map((link) => buildLink(link.target, link.content))
    .join('');
  let headerHtml = buildHeader(header);

  return `
     <tr>
              <td style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;" align="left">
        ${headerHtml}
     </td>
     </tr>
                 <tr>
              <td style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;" align="left">

      <div style="font-family:Bitter, Georgia, serif;font-size:15px;line-height:1.5;text-align:left;color:#000000;"><ul style="font-size: 14px; font-family: Bitter, Georgia, serif; color: #000000;">
      ${linkHtml}
</ul></div>

              </td>
            </tr>
    `;
};

const buildHeader = (
  content: string
) => `<div style="font-family:Bitter, Georgia, serif;font-size:15px;line-height:1.5;text-align:left;color:#000000;"><h2 style="font-size: 17px; font-family: Ubuntu, Helvetica, Arial; color: #ad5152;">${content}</h2></div>
`;

const buildLink = (
  target: string,
  content: string
) => `<li style="font-size: 14px; font-family: Bitter, Georgia, serif; color: #0A0A0A;"><a href="${target}" target="_blank" rel="noopener" style="color: #4792ec; font-family: Roboto, Tahoma, sans-serif;">${content}</a></li>
`;
