# Portfolio Huy Nguyen — tổng hợp nghiên cứu và hướng thiết kế v3

Cập nhật **02/10/2026**. Phạm vi: đọc lại yêu cầu/corrections của session, audit bản website hiện có, kiểm chứng sản phẩm công khai, xem reference thật và phát triển storyboard/motion proof để review.

**Kết luận:** vấn đề không chỉ là website khác ảnh storyboard. Storyboard cũ và cách triển khai đang ưu tiên tám bố cục minh họa đẹp, trong khi mục tiêu là khiến người xem nhớ **Huy — AI engineer × creative builder**, hiểu đóng góp cụ thể và tin tưởng thông qua một câu chuyện chỉ cần cuộn để đọc.

Hướng v3 bên dưới là **đề xuất chưa được Huy chốt**. Phản hồi mới nhất đã mở lại art direction và storyboard; `storyboard-v2.png` là lịch sử vòng trước, không còn là bản phải sao chép cứng. Logo Nekomata đã chọn, thông tin cá nhân và các corrections về attribution vẫn giữ hiệu lực.

## Đọc tài liệu nào trước

| Tài liệu | Nội dung |
| --- | --- |
| [Session brief](session-brief.md) | Mục tiêu, toàn bộ corrections, quyết định đã chốt/chưa chốt và lịch sử phản hồi |
| [Brand/content audit](brand-content-audit.md) | Vì sao chưa thuyết phục; positioning, English copy, attribution và evidence gaps |
| [Visual/motion audit](current-visual-motion-audit.md) | Đối chiếu source, website thật, mobile, choreography và chất lượng hình |
| [Sản phẩm chính thức](product/README.md) | App Store/API, release notes, Vulcan, Chat Smith Design Studio và hình public |
| [Reference research](scroll-reference-research.md) | Năm website đã render, ảnh desktop/mobile, hành vi scroll và take/avoid |
| [Motion & implementation research](motion/implementation-research.md) | React Bits demos, Remotion Player, scroll/performance contract and access limitations |
| [Ex-Aid research](motion/ex-aid.md) | Điều Toei xác nhận và giới hạn khi chưa xem được footage |
| [Storyboard chạy trong trình duyệt](../../design/v3/index.html) | Bản review riêng để xem palette, nhịp nội dung và card → hero |
| [Design specification](../../design/v3/spec.md) | Hướng thiết kế, scene contract và phạm vi prototype |
| [Remotion storyboard](../../design/v3/remotion/README.md) | Hai composition có frame thật: CardToHero và VisualDNA |

## Những điều đã được chứng minh, và bởi nguồn nào

“Đã xác nhận” luôn có phạm vi. Bằng chứng sản phẩm tồn tại không tự chứng minh đóng góp cá nhân; artwork concept không phải ảnh đầu ra production.

| Chủ đề | Nguồn/mức chắc chắn | Cách dùng trong portfolio |
| --- | --- | --- |
| Huy là AI Engineer tại Vulcan Labs; mục tiêu personal brand và breadth creative | Huy trực tiếp cung cấp | Positioning chính; không tự thu hẹp thành CV hoặc bán contract lớn |
| `chatsmith.io` là official domain | Vulcan link trực tiếp; App Store/API cùng trỏ domain | Có thể link sản phẩm chính thức; không còn gọi đây chỉ là nguồn cộng đồng |
| Daily Smith đã release | Release notes 20/05/2026, v8.260518.2 nêu summarize emails, prep meetings, highlight matters | Xác nhận feature public; Huy cung cấp riêng attribution về pipeline/data flow/LLM-agent |
| Design Studio có Menu/Poster/Flyer/Business Card/Social Content và Logo | UI/gallery website chính thức | Dùng làm product context; không nhận từng template là do Huy tạo |
| Phương pháp visual DNA và adoption sang format khác | Huy trực tiếp cung cấp | Nêu quyết định và adoption rõ; không tạo metric tăng chất lượng hoặc fake before/after |
| Creative là contributor; pipeline poster có trước | Correction trực tiếp của Huy | Ghi menu adaptation + visual-DNA research/design; không ghi PIC Creative Studio |
| Slide Design chưa release; Huy PIC chính; có image-to-editable module | Huy trực tiếp cung cấp | “In development · Concept preview”; không tự hứa format/layer/accuracy cụ thể |
| Bố cục và motion của reference | Browser render, nhiều vị trí scroll, ảnh và DOM/video state | Học cơ chế có quan sát; không coi cảm nhận thiết kế là metric conversion |
| Hình gen/specimen/Remotion v3 | Artifact do chúng ta làm trong vòng này | Minh họa ý tưởng và năng lực trình bày; không phải bằng chứng đầu ra công ty |

Đã đọc App Store description, version history, lookup API và xem 10 screenshot chính thức. Chúng chủ yếu nói model/image generation/writing/search/voice/sync, không trực tiếp chứng minh menu pipeline hoặc attribution của Huy. Menu gallery public có nhiều phong cách hơn botanical; điều này củng cố việc không để menu aesthetic trở thành identity toàn website.

## Vì sao vòng trước chưa đạt

- **Identity sai trọng tâm:** serif lớn, food/collage/lá/giấy xuất hiện khắp trang, dễ gợi editorial hoặc restaurant designer hơn người xây AI đa lĩnh vực. Tên còn bị chân dung che.
- **Không có transformation liên tục:** nhóm card chỉ xoay nhẹ; scene sau là đối tượng khác. Người xem chưa thấy một card được focus rồi mở thành cùng một hero như ý tưởng Ex-Aid.
- **Motion chưa giải thích công việc:** cube tĩnh, slide đã tách lớp sẵn trong PNG, Remotion chỉ có playhead trên ảnh timeline. Chưa thấy input được xử lý thành output.
- **Bằng chứng và đóng góp quá nhỏ:** role/copy quan trọng xuống 10–12px trên mobile; DNA/adoption nằm sâu; media engineering thật bị thay bằng AI cover ở homepage.
- **Mobile dài nhưng chưa tăng hiểu biết tương xứng:** hero → menu collage → method cao kéo dài trước khi thấy agent/slide. Gallery sáu ảnh vô danh thể hiện mood hơn là work.

Build, accessibility và Lighthouse đạt không giải quyết các vấn đề trên. Lần review này phải kiểm tra thêm người xem hiểu Huy làm gì, đã tự đóng góp gì, và có bằng chứng nào để tin.

## Sáu nguồn thiết kế đã xem và cách áp dụng

Năm website đầu được xem ở desktop/mobile; React Bits là nguồn component với demo live đã thao tác trong trình duyệt. Rauno và Devouring Details cùng tác giả, không phải hai nguồn độc lập về hiệu quả kinh doanh. Xem [nghiên cứu chi tiết](scroll-reference-research.md) cho capture và giới hạn.

| Reference | Quan sát và phần nên lấy | Trade-off cần tránh |
| --- | --- | --- |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Người thật + role rõ; work ghi vai trò; mobile đưa preview ra sẵn. [Desktop](references/dennis/1440-step0.png) / [mobile](references/dennis/390-step2.png) | Tên marquee bị cắt; desktop dùng scroll bằng transform. Huy cần tên đọc trọn và native scroll |
| [Rauno](https://rauno.me/) / [Craft](https://rauno.me/craft) | Poster deck thật thu nhỏ/chạy ngang theo scroll; specimen có tên, ngày, production/prototype. [Deck](references/rauno/1440-step2.png) / [craft mobile](references/rauno/craft-390-step0.png) | Homepage mobile là deck nhỏ, không hợp tuyến đọc dọc; quá nhiều video làm loãng focus |
| [Devouring Details](https://devouringdetails.com/) | Demo cạnh lời hứa; ghi footage React components; giải thích → proof → người tạo. [Desktop](references/devouring-details/1440-step3.png) / [mobile](references/devouring-details/390-step0.png) | Thước/CTA cam có thể băng qua text; không sao chép testimonial hay customer logos |
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) | Một lợi ích mỗi scene; video mobile có framing riêng; pause rõ và dừng ngoài viewport. [Desktop](references/apple-airpods/1440-step0.png) / [mobile](references/apple-airpods/390-step4.png) | Media nặng, trang rất dài; không giấu overview trong carousel; hero autoplay không phải scroll-scrub |
| [Linear](https://linear.app/) | Tuyên bố dễ hiểu → workflow UI → proof; neutral palette và màu trạng thái có ý nghĩa. [Desktop](references/linear-desktop.png) / [mobile](references/linear-mobile.png) | UI thu nhỏ trên mobile khó đọc; tránh biến Huy thành một landing page SaaS chung chung |
| [React Bits](https://www.reactbits.dev/components/bubble-menu) | Bubble Menu, Scroll Expand, Orbit Images và Scroll Stack đã mở demo live; chọn thành phần phục vụ choreography | Component đẹp riêng lẻ chưa tạo thành câu chuyện; không nhồi effects, không bắt click menu để hiểu portfolio |

React Bits có bốn mẫu đáng phân công rõ: [Bubble Menu](motion/bubble-open.png) cho navigation phụ; [Scroll Expand](motion/expand-scrolled.png) cho media mở khung; [Orbit Images](motion/orbit-start.png) cho trạng thái đầu các capability cards; [Scroll Stack](motion/stack-scrolled.png) cho nhóm thông tin ngắn khi phù hợp. Các file `.json` cùng tên lưu URL/status/text; đây không phải cam kết đã kiểm tra tất cả breakpoint, keyboard hay reduced motion của component gốc.

**Nguồn chưa đủ:** Lusion chỉ xem được intro rồi capture timeout; Active Theory mới có HTML; Bruno chưa có bộ render đầy đủ. Không dùng chúng như những reference đã review mobile/scroll trọn vẹn.

## Ex-Aid và giới hạn web search

[Toei/Kamen Rider official guide](https://www.kamen-rider-official.com/columns/wiki/2035/) trả 200 và mô tả hình các Rider xoay quanh Emu như màn chọn nhân vật, chọn Ex-Aid rồi biến hình. Như vậy **orbit → selection → transformation** có căn cứ chính thức.

YouTube search trả **403 “Domain forbidden”**; Google gặp CAPTCHA/trang thử thách. Huy sau đó gửi video trực tiếp, nhưng file vượt32MiB của công cụ tải workspace. Đường chuyển file sang Higgsfield bị automatic approval review từ chối; Huy báo dịch vụ không còn quota nên sẽ xử lý local khi có đoạn ngắn/nén phù hợp. Chưa xem được frame nào từ attachment này. Chưa xem được footage/timestamp nên chưa xác nhận số card, camera angle, easing hay timing. [Bản ghi và capture lỗi](motion/ex-aid.md) phân biệt rõ quan sát chính thức với choreography đề xuất. Không có yêu cầu tắt proxy/TLS hoặc vượt xác minh.

## Ba hướng khả thi

| Hướng | Hình thức và motion | Điểm mạnh | Đánh đổi |
| --- | --- | --- | --- |
| **A — Connected transformations, khuyến nghị** | Ivory sáng + graphite; copper ấm/dusty plum tiết chế; twin-tail motif; card → hero → method → output | Cân bằng cá tính creative, tính rõ ràng và trust; light/dark rhythm tốt; dễ tổ chức mobile | Phải biên đạo continuity và khoảng dừng đọc kỹ; không thể chỉ ráp component có sẵn |
| **B — Cinematic dark** | Graphite chiếm ưu thế, metallic/glass objects, ánh sáng có kiểm soát, chuyển cảnh sâu | Wow mạnh, tạo cảm giác công nghệ và thương hiệu ấn tượng | Dễ thành demo studio/game; chữ/ảnh bằng chứng khó đọc; tải và motion mobile tốn hơn |
| **C — Editorial evidence-led** | Nền sáng, lưới chữ/hình rõ, portrait và artifact thật, motion nhỏ chính xác | Dễ hiểu, đáng tin, tối ưu đọc và mở rộng case study | Ít dấu ấn biến hình; dễ tiếp tục hụt kỳ vọng “nhiều motion” của Huy |

**Khuyến nghị A** vì dùng motion để nối ý nghĩa, giữ độ biểu cảm Huy muốn và đủ không gian cho đóng góp thật. Ivory ở đây là nền sạch; không quay lại hệ lá/food/collage phủ toàn site. Hình sản phẩm có thể giàu màu hơn identity. Đây là đề xuất để review, chưa phải palette/layout được duyệt.

Positioning đề xuất: **“Huy Nguyen — AI engineer × creative builder.”** Hero hiện trong prototype: **“Huy Nguyen. Curiosity, applied.”**, với câu scope rõ ngay dưới: **“I build context-aware agents, generative design workflows, and tools that make ideas usable.”** Ba cửa vào năng lực: **Understand context · Generate with direction · Make designs editable.** Content production dùng tiếng Anh; tài liệu trao đổi giữ tiếng Việt.

## Storyboard phải khiến người xem hiểu điều gì

| Nhịp | Điều người xem nắm được | Cảnh và bằng chứng |
| --- | --- | --- |
| 1. Nhận diện | Ai, làm gì, breadth hiện tại | Tên trọn, role, Vulcan Labs, ba capability preview; không cần bấm để hiểu |
| 2. Chọn và biến đổi | Creative AI là một năng lực nổi bật | Cùng một card đi từ orbit vào mặt phẳng chính, mở thành scene; copy giữ đủ lâu để đọc |
| 3. Phương pháp | Huy đã thay đổi cách định hướng generation | Reference nguyên vẹn → mô tả coherent DNA → guideline → output; menu adaptation và team adoption đặt ngay cạnh |
| 4. Engineering có ích | Agent đưa ngữ cảnh rời rạc thành ưu tiên rõ | Email/calendar minh họa → context → brief; attribution pipeline/LLM-agent; không diễn gửi mail/sửa lịch |
| 5. Range và proof | Đang xây editable workflow, từng làm integration thực tế | Slide concept có status In development; engineering media thật với role và phạm vi |
| 6. Con người và liên hệ | Có taste, tò mò, khả năng xây và dễ tiếp cận | Ít personal studies có tên/ý đồ; ảnh Huy thật; email/LinkedIn rõ |

Mobile dùng cùng thứ tự hiểu, bố cục một cột và transition ngắn. Không kéo dài nhiều màn pin, không bắt swipe ngang, hover hay play mới biết nội dung. Reduced motion phải cho thấy đầy đủ trạng thái cuối; scroll nhanh/ngược không làm mất thông tin.

## Image Gen, Remotion và tiêu chí review

**Image Gen:** tạo artwork twin-tail/twin-ribbon có tính cá nhân và các reference specimen riêng. Logo đã chọn không regenerate; portrait thật là anchor nhận diện. Text, role, status, schema minh họa và UI quan trọng là HTML/SVG, không bake vào ảnh. Hình concept có caption ngắn, không giả làm screenshot hoặc benchmark của công ty.

**Remotion:** [CardToHero](../../design/v3/remotion/CardToHero.tsx) gồm 180 frames/6 giây; [VisualDNA](../../design/v3/remotion/VisualDNA.tsx) gồm 240 frames/8 giây. Card/specimen/text/connector là layer riêng, cùng artifact tiếp tục qua các trạng thái. Đây là motion proof; website dùng DOM/native scroll cho navigation và đọc nội dung. Frame ảnh và hướng dẫn Studio nằm trong [thư mục Remotion](../../design/v3/remotion/README.md).

**Bản review cụ thể:** [Storyboard tổng quan từ ảnh chụp thật](../../design/v3/previews/storyboard-v3.png), [video cuộn prototype](../../design/v3/previews/scroll-storyboard-v3.webm), [HTML storyboard v3](../../design/v3/index.html), [spec](../../design/v3/spec.md), [desktop preview](../../design/v3/previews/hero-1440.png), [mobile preview](../../design/v3/previews/hero-390.png). Bản này tách khỏi `src/`, chưa thay website chính hoặc deploy. Các link case trong prototype có thể trỏ sang website hiện tại để giữ ngữ cảnh.

Review direction dựa trên ba câu hỏi: sau màn đầu có hiểu Huy là ai/làm gì; sau mỗi case có chỉ ra được quyết định/đóng góp cá nhân; sau toàn tuyến có phân biệt được sản phẩm released, concept và bằng chứng thật. Sau đó mới đánh giá độ hấp dẫn của chuyển cảnh, nhịp nghỉ đọc, tính liên tục của vật thể và cảm giác mobile. Điểm performance là một điều kiện kỹ thuật, không thay thế các tiêu chí này.

Các gap cần tiếp tục ghi nhận: chưa có matched Creative before/after được phép public; Daily public screenshot trực tiếp còn thiếu; Slide chưa có production demo/formats/accuracy được xác nhận; một số metric legacy thiếu điều kiện đo. Có thể tạo direction thuyết phục với bằng chứng đang có, nhưng không lấp gap bằng hình gen hay lời hứa mới.
