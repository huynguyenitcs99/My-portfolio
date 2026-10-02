# Session brief — Huy Nguyen portfolio

Cập nhật 02/10/2026. Tài liệu nội bộ để giữ đúng yêu cầu, corrections và nguồn thông tin. Đây không phải portfolio copy và không tự chốt một art direction mới.

## 1. Mục tiêu và cách làm do user yêu cầu

- Huy Nguyen, AI Engineer, hiện làm tại Vulcan Labs. Website cần khiến người xem nhớ Huy, hiểu năng lực, tin tưởng và chủ động tìm tới.
- Personal brand là ưu tiên. LinkedIn và Upwork được hỗ trợ bởi website, nhưng không tối ưu riêng cho tuyển dụng hoặc chỉ các contract xây hệ thống lớn.
- User muốn tiếp xúc nhiều use case, từ AI systems tới image/video editing, design-to-editable và creative workflows; qua đó học thêm cách dùng Claude Code/Codex, tìm nhu cầu để sau này xây app cá nhân.
- Định vị chủ đạo người dùng mô tả: **AI engineer + creative**. Trẻ trung, năng động, Gen Z, công nghệ, creative; nhiều motion và tương tác có dấu ấn.
- Content portfolio dự kiến **tiếng Anh**; trao đổi công việc **tiếng Việt**.
- Rebuild từ đầu với công nghệ stable mới, kiểm tra compatibility, performance và mobile.
- User yêu cầu **storyboard trước**, xác định mỗi lần scroll thấy gì, gây ấn tượng như thế nào. Người xem phải **ít thao tác mà vẫn hiểu tổng quan**.
- Yêu cầu gốc: nghiên cứu web/hình thật trước; 4–6 reference đã thật sự xem layout/motion/mobile; 2–3 UI/UX hướng và trade-off; **trao đổi từng quyết định quan trọng trước implementation**.

## 2. Các corrections về công việc — nguồn trực tiếp là Huy

### Daily Smith trong Chat Smith

- Không phải Chat Smith chỉ có Daily Smith; còn Creative/Design Studio.
- Huy là PIC thiết kế pipeline AI và luồng dữ liệu, tập trung LLM/AI Agent — “bộ não” của ứng dụng.
- User kết nối email/calendar; AI lấy context qua MCP/tools kết nối provider như Gmail và Google Calendar.
- Pipeline giúp biết hôm đó cần làm gì, email nào quan trọng, thông tin cần chú ý; có follow-up conversation và tools được ứng dụng hỗ trợ.
- **Chưa xác nhận** actions ghi như gửi email hoặc sửa calendar. Không được tự thêm chúng vào phần Daily/Huy.
- Daily đã lên sản phẩm theo lời user.

### Creative / Design Studio

- Đã lên sản phẩm; **Huy không phải PIC**.
- Đồng nghiệp xây poster pipeline ban đầu. Huy port pipeline đó sang menu.
- Đóng góp lớn nhất: research/design lại khả năng gen thẩm mỹ tốt hơn, bắt đầu từ menu, bằng ảnh reference/DNA → extract mô tả DNA dạng JSONL → guideline cho generation.
- Điểm khác biệt: giữ design language mạch lạc từ reference, thay vì ghép các trục design độc lập của poster pipeline ban đầu.
- Sau đó chính người làm poster áp dụng phương pháp của Huy cho poster, flyer, business card và social để improve output quality.
- Đây là chất lượng và adoption do user báo, **không có metric hoặc matched before/after được xác nhận**. Không nhận toàn bộ product hay output gallery là của Huy.

### Slide Design

- Huy là PIC chính. **Đây là phần duy nhất trong ba hướng hiện tại chưa release** theo user.
- Image-based slide → editable slide là một module trong Slide Design; user nêu ví dụ đây cũng là use case từng thấy trên Upwork.
- Chỉ dùng thông tin phù hợp public. Chưa xác nhận exact export formats, layer taxonomy, accuracy hoặc public demo.

### Legacy work

- NextSight industrial defect inspection; CCTV multi-camera ReID; CrystalSound noise/echo cancellation là nguồn cũ trong repo/CV.
- Review đầu phát hiện định vị vision/audio cũ không phản ánh agent/generative AI hiện tại; technical results nằm sâu trong cases; CTA yếu; About dài như CV.
- Timeline cần giữ thận trọng: About từng ghi >3 năm, CV >4 năm; NextSight frontmatter 2021 nhưng nội dung deployment 2024–2025. Không tự chọn một con số để che mâu thuẫn.
- Archive xác định ReID là four-camera POC; 500+ là target. CrystalSound model do team khác làm, Huy tập trung integration/application/release. Các số đo cũ cần điều kiện trước khi public lại như thành tích.

## 3. Nguồn chính thức đã được kiểm chứng trong lần research này

Chi tiết, timestamps, captures và giới hạn nằm ở [product/README.md](product/README.md). Các kết luận dưới đây dựa trên research record đó, phân biệt với attribution do Huy cung cấp.

| Điều đã quan sát ở nguồn chính thức | Ý nghĩa | Không suy ra |
| --- | --- | --- |
| Vulcan link trực tiếp Chat Smith; Apple sellerUrl/App Store description cũng trỏ chatsmith.io | `chatsmith.io` đã được xác minh là official domain, không còn chỉ là link cộng đồng | Cấu trúc pháp nhân/ownership hoặc employment cá nhân từ seller field |
| App Store note 20/05/2026, version 8.260518.2 nói Daily Smith Agent summarize emails, prep meetings, highlight matters | Feature có bằng chứng release công khai | MCP/AI architecture/PIC cá nhân; gửi email/sửa lịch trong module Huy |
| Web dùng tên **Design Studio**, có Logo/Poster/Flyer/Menu/Business Card/Social Content | Có suite creative nhiều format; menu category public | Mỗi template của Huy hoặc do phiên bản phương pháp của Huy tạo |
| Menu gallery có nhiều visual languages thật đang được website phục vụ | Botanical-only portfolio đang thu hẹp câu chuyện quá mức | Template đẹp là benchmark quality uplift |
| App Store có Calendar Smith marketing | Capability cấp app có public mention | Tự gán calendar write actions cho Daily Smith hoặc Huy |
| Slide Design chưa thấy public UI entry; từ “presentations” chung trong SEO | Không có căn cứ đổi status user đã nêu | Slide module đã released |

Đã đọc App Store description/version history/API và xem 10 screenshot chính thức. Chúng chủ yếu nói model/image generation/writing/search/voice/sync, **không trực tiếp minh họa Daily Smith hay menu pipeline**.

Access hiện tại đã tốt hơn session cũ: official domains/API trả 200 qua cách truy cập được ghi lại. Chat Smith vẫn có “Verifying you’re human…”; không bypass hoặc chạy thử generation. Lỗi browser proxy-CA ban đầu được xử lý bằng đường fetch kiểm chứng TLS. Không nói end-to-end product đã được thử. Nguồn GitHub/community không dùng để thay việc đã đọc official site.

## 4. Identity và những lựa chọn đã được user xác nhận

- User từng thấy palette quá chói; muốn màu liên quan sở thích cá nhân, mệnh/cung/tuổi mèo.
- Ngày giờ sinh được user đưa trong bối cảnh chọn màu: **24/05/1999, 22:30**. Đây chỉ là dữ liệu planning riêng; không đưa ngày giờ sinh hoặc astrology thành claim trên portfolio. Không có quyết định nào buộc toàn website phải là botanical/brown.
- Logo theo hướng **AI + Nekomata**: Song Tử/mèo biểu trưng thành **mèo hai đuôi**.
- User chọn phương án A với đầu sắc sảo của B, hai đuôi đồng nhất; muốn gaze tự tin/kiêu hãnh, **đầu quay sang trái hơi hướng lên**, không nhìn thẳng.
- Giữ nguyên face/eye hình được chọn; chỉ chỉnh hướng nhìn. User nhắc lại đường trắng ở ngực rồi chấp nhận logo cuối.
- Logo asset đã chốt trong repo: `public/images/brand/nekomata.png`. Gương mặt/mắt/đường trắng S trước ngực và hai đuôi matching là các đặc điểm cần giữ. Không tự regenerate logo khi redesign site.
- Hình người là Huy; ảnh gốc `public/images/avatar.jpg`. Các portrait generated trước là sản phẩm triển khai, không phải user yêu cầu thay nhận dạng.

## 5. Motion/reference user đã yêu cầu

- User chủ động yêu cầu **Remotion** đã cài và **Image Gen** để tạo visual personal phù hợp.
- Quan tâm hiệu ứng card xoay vòng, chọn card rồi trở thành hero, liên tưởng transformation **Kamen Rider Ex-Aid**. User yêu cầu tự tìm YouTube/internet, không có timestamp được cung cấp.
- Ambient browser từng mở một trang Kamen Rider; đó là UI state, không tự là bằng chứng user chọn đúng footage.
- User đưa [React Bits Bubble Menu](https://www.reactbits.dev/components/bubble-menu), yêu cầu xem thêm nhiều effects. Đó là reference/cảm hứng, không yêu cầu nhồi mọi effect hoặc bắt dùng một thư viện cụ thể.
- Hiệu ứng phải phục vụ dẫn dắt bằng scroll và không bắt người xem thao tác nhiều. Remotion cần có vai trò thị giác/nội dung thực, không chỉ có dependency hoặc playhead để tick checklist.

## 6. Lịch sử quyết định và trạng thái hiện tại

1. “Creative AI Studio” ban đầu là **đề xuất**, chưa chốt palette/layout/stack.
2. Sau logo, user nói lấy logo đó và bắt đầu update toàn bộ storyboard/website. Điều này đã cho phép triển khai hướng cũ; không cần quay lại xin phép những bước reversible đã nằm trong phạm vi.
3. User phản hồi website khác storyboard, yêu cầu làm giống hoàn toàn và gen ảnh phù hợp. Đã có revision theo `docs/design/storyboard-v2.png`, 8 scenes, paper/espresso/earth/plum, 7 nhóm artwork.
4. Bản đó có build/type/lint/browser checks và Lighthouse được ghi lại, nhưng user **tiếp tục không hài lòng**.
5. **Yêu cầu mới nhất mở lại toàn bộ thiết kế:** deep dive toàn session, deep research internet, motion + Image Gen + Remotion, scroll narrative, upgrade UI/UX/motion/màu/hình/content để thẩm mỹ cao, dễ hiểu và tạo trust.

Hệ quả: `storyboard-v2.png` là **lịch sử của vòng trước**, không còn là tiêu chí phải sao chép cứng trong vòng này. Logo/personal facts/attribution và mục tiêu vẫn có hiệu lực. Hero, palette accents, type, scene order, imagery và choreography cần được review lại; chưa có một direction mới được user xác nhận trong lượt hiện tại.

Yêu cầu gốc trao đổi các quyết định lớn trước implementation vẫn là bối cảnh quan trọng. Latest prompt cho phép research sâu, audit và phát triển phương án upgrade; cần làm phương án/storyboard/motion proof cụ thể để review thay vì tiếp tục âm thầm kéo dài hướng cũ. Không tự suy previous approval thành approval cho mọi art direction mới, cũng không biến research hoặc prototype reversible thành gate xin phép không cần thiết.

## 7. Đề xuất đang mở, không phải fact hoặc approval

- Dùng “AI engineer × creative builder” làm positioning chính; narrative dựa vào transformation/context/generation/editability.
- Hero/copy, six-act narrative và proof strategy ở [brand-content-audit.md](brand-content-audit.md) là đề xuất.
- Chỉ dùng botanical trong project example; hệ identity chung nên khác sản phẩm menu.
- Ưu tiên media thật + attributable role + method adoption; dùng generated imagery để giải thích/concept, không dựng giả bằng chứng.
- Dùng Remotion cho một hoặc vài sequence có causal story; DOM cho text/navigation/reading. Stack/motion architecture cụ thể chờ kết quả research và prototype.
- Cần so sánh ít nhất mobile/desktop, reduced motion, fast/reverse scroll và comprehension—not only screenshot or Lighthouse.

## 8. Không được tự thêm

Không invent metric, client testimonial, availability, Upwork URL, years-of-experience, product release, output type hoặc pipeline internals. Không nhận thiết kế của team thành personal PIC. Không biến user astrology preference thành scientific claim. Không publish private implementation/product data. Không deploy/push/PR chỉ vì có yêu cầu research/upgrade local; publication là hành động riêng cần nằm trong authorization thực tế.
