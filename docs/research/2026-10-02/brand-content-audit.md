# Brand, content and credibility audit

Ngày: 02/10/2026. Phạm vi: toàn bộ yêu cầu trong session, source homepage/About/Work/6 case, ba case gốc trong `content/archive`, spec/storyboard/review và ảnh desktop/mobile hiện tại. Đã xem storyboard, full-page desktop, mobile hero và ảnh chân dung gốc. Thông tin sản phẩm chính thức được đối chiếu với [product research](product/README.md); audit này không tự nhận đã chạy thử sản phẩm.

## Kết luận

Bản hiện tại minh họa được các chủ đề, nhưng chưa chứng minh rõ cách Huy suy nghĩ và tạo ra kết quả. Screenshot fidelity tốt hơn không tự tạo ra trải nghiệm đúng kỳ vọng. Trang đang đọc như tám poster đẹp cùng một aesthetic; người dùng muốn một câu chuyện chuyển động, hiểu được chỉ bằng scroll, với dấu ấn AI engineer × creative builder và bằng chứng thuyết phục.

Đây là đánh giá thiết kế/content, không phủ nhận các kiểm tra build/accessibility đã chạy. Những kiểm tra đó không chứng minh mức độ hấp dẫn, dễ hiểu hoặc đúng personal brand.

## Findings theo ưu tiên

| Ưu tiên | Vấn đề hiện tại | Bằng chứng | Hướng xử lý |
| --- | --- | --- | --- |
| P0 | Botanicals/giấy/menu chi phối toàn bộ identity; dễ bị hiểu thành editorial hoặc restaurant designer | Hero, Creative, method, Daily và contact cùng lá/collage | Để botanical trong ví dụ menu; identity chung dùng người thật, Nekomata, hai đường chuyển động và quan hệ input → intelligence → outcome |
| P0 | Không có card xoay/chọn rồi biến thành cùng một hero | `src/components/orbit.tsx`: group rotate 0→12°/translate 70px; section sau là đối tượng khác scale 0.86→1 | Choreograph một đối tượng liên tục qua các trạng thái; scroll tự chọn/focus, không yêu cầu click |
| P0 | Motion chưa giải thích đóng góp | Remotion hiện là playhead chạy trên ảnh timeline; DNA/context/slide là ảnh hoặc panel gần tĩnh | Dùng motion để giải thích reference → coherent description, context → priorities, image → editable concept; reveal/hover là phụ |
| P0 | Đóng góp cá nhân nhỏ hơn tên sản phẩm/artwork | Điểm phương pháp DNA được đồng nghiệp áp dụng nằm cuối Scene 03; PIC là acronym không phổ thông | Headline nói decision/outcome; role một dòng dễ hiểu; adoption xuất hiện trong lượt đọc homepage |
| P0 | Homepage thiếu proof dù repo đã có media thật | Engineering dùng cover AI-generated, media NextSight/ReID/audio ở sâu trong case | Có một proof strip thật với role/caption cụ thể; public product context rõ, không đồng nhất screenshot sản phẩm với đóng góp cá nhân |
| P1 | Copy giống tài liệu kiểm duyệt hơn câu chuyện | “Sources (Confirmed)”, “no private account data”, “public-safe level”, “Existing public case media”, “animated with Remotion” | Giữ nhãn provenance ngắn tại media; chuyển nội bộ source/unknowns vào research docs |
| P1 | DNA diagram trình bày gần giống các trục rời rạc Huy đã thay thế | JSON mẫu chỉ liệt kê style/tone/elements/typography độc lập; gọi JSONL nhưng render pretty multiline JSON | Giải thích mối quan hệ hierarchy/composition/rhythm trước; dùng một visual description mạch lạc; không giả lập production schema |
| P1 | Playground là moodboard, chưa thành work | Sáu ảnh núi/kiến trúc/lá/timeline không có tên study, câu hỏi hoặc kết quả | 2–3 personal studies có tên và một ý đồ; phân biệt concept mới với dự án thật |
| P1 | Typography và chân dung chưa tối ưu nhận diện | Tên bị portrait che; ảnh generated khác nhẹ tóc/tỷ lệ so với source | Giữ tên đọc được; dùng ảnh thật cho identity, gen artwork/environment riêng; không tự dựng persona khác |
| P1 | Slide layer list cụ thể vượt bằng chứng hiện có | `src/app/page.tsx` liệt kê Text/Image/Shape/Vector; user chỉ xác nhận image-to-editable module | Bỏ cam kết layer type; hoặc cho biết rõ đây là đối tượng của demo concept tự tạo, không claim product capability |

## Định vị đề xuất, chưa chốt

> **Huy Nguyen — AI engineer × creative builder.**  
> **I turn complex AI into useful, expressive tools.**  
> I build context-aware agents and generative design workflows at Vulcan Labs, with a foundation in computer vision and real-time audio.

Ba cửa vào nội dung: **Understand context · Generate with direction · Make designs editable.** Đây là các hướng công việc để người xem hiểu breadth, không phải ba gói dịch vụ chốt bán hàng. CTA: **Explore my work**; contact/LinkedIn luôn tìm thấy được.

Biến thể thiên art direction: “Engineering intelligence. Shaping what it becomes.” Bản đầu dễ hiểu hơn cho cả người technical và người tìm creative help, nên được ưu tiên.

## Narrative đề xuất

| Act | Người xem hiểu gì | Hình/motion phục vụ nội dung |
| --- | --- | --- |
| 1. Meet the builder | Ai, làm gì, breadth có định hướng | Huy, Nekomata nhỏ, ba capability cards đọc được ngay; chuyển động mở đầu ngắn |
| 2. See a transformation | Có tư duy định hướng AI output | Một card tiến lên thành cùng một surface Creative; reference giữ thành coherent design direction |
| 3. Understand the contribution | Huy research/design method; team áp dụng rộng hơn | Reference → description → guideline; menu rồi các format khác; attribution ở ngay cạnh |
| 4. See engineering depth | Kết nối context/data/tools thành trải nghiệm hữu ích | Email/calendar synthetic example thu gọn thành priorities và follow-up; giữ nguồn nhìn thấy được |
| 5. See range and proof | Đã làm integration thực tế, đang xây editable workflows | Slide concept ngắn + ảnh/video thật NextSight/ReID/audio với vai trò cụ thể |
| 6. Meet the person | Có taste, tò mò và khả năng xây; dễ liên hệ | 2–3 named personal studies, portrait, contact ngắn |

Có thể triển khai thành tám scene nhưng phải có nhịp hook → process → payoff → contrast → evidence → human ending. Không lặp một heading lớn, artwork lớn, caption nhỏ ở mọi section. Ordinary scroll phải đọc được toàn bộ nội dung; không cần hover/drag/play để hiểu.

## English copy đề xuất

### Creative AI · Chat Smith Design Studio

Public web hiện dùng tên **Design Studio**; user gọi **Creative Studio**. Ghi cả product context rõ ràng, không tự giả định mọi client dùng cùng nhãn.

> **A visual system, carried from reference to generation.**  
> For Chat Smith’s design workflows, I adapted an existing poster pipeline for menus and designed a reference-based visual DNA method to guide more coherent results.

> **My contribution:** Menu pipeline adaptation · Visual DNA research and design  
> **What followed:** The original poster pipeline owner adopted the method for posters, flyers, business cards and social content.

Không đổi thành “I led Creative Studio” hoặc “I improved every format”. Website/team context và vai trò cá nhân là hai lớp khác nhau.

Method:

> **Preserve the relationships that make a design feel coherent.**  
> Reference images become structured visual descriptions, then practical generation guidelines.

JSONL là implementation detail hỗ trợ hiểu method, không phải headline về giá trị. Ví dụ description conceptual có thể mô tả một hierarchy: “An editorial hierarchy led by oversized type, restrained food photography and a consistent botanical rhythm.” Không trình bày ví dụ đó là production schema.

### Daily Smith

> **Turn a busy inbox and calendar into a clearer day.**  
> I’m responsible for the AI pipeline and data flow behind Daily Smith’s context-aware experience: connecting provider tools, preparing context and supporting useful follow-up conversations.

> **My responsibility:** AI pipeline · Data flow · LLM-agent layer  
> **Context:** Chat Smith, Vulcan Labs · Released

Official release notes xác nhận Daily Smith Agent ở cấp sản phẩm. Vai trò/data flow/MCP của Huy là thông tin Huy cung cấp. Không thêm gửi email hoặc sửa lịch vào demo.

### Slide Design

> **An image should not be the end of the workflow.**  
> I’m the main engineer responsible for Slide Design, including a module that turns image-based slides into editable content.

> **In development · Concept preview**

Nếu dùng wording “lead”, chỉ scope dự án này; không suy thành engineering manager. Không claim conversion accuracy, exact layer types hoặc product availability.

### Engineering roots

> **Built across models, interfaces and real-world constraints.**

- **NextSight:** Industrial vision, delivered as a working inspection application. Camera integration, inference and desktop software.
- **Multi-camera ReID:** One identity across multiple camera views. Four-camera proof of concept; pipeline and runtime integration.
- **CrystalSound:** Audio intelligence that fits everyday calls. Audio pipeline, desktop application and release integration.

### Contact

> **Have a problem worth exploring?**  
> I’m interested in useful AI, creative workflows and the unexpected space between them.  
> **Let’s talk** · LinkedIn · GitHub

Không tự thêm availability, Upwork profile, consulting packages hoặc “book a call”. User ưu tiên personal brand và không giới hạn loại công việc.

## Proof strategy

**Dùng được ngay:** role statements đúng phạm vi; media thật cũ; official product links/screenshots làm product context; method/adoption do user xác nhận; synthetic explanation có caption ngắn. Chỉ đưa ảnh công khai vào production sau khi xác định cách dùng phù hợp; research screenshot không tự động là portfolio asset.

**Giá trị mạnh nhất của Creative hiện có:** phương pháp do Huy research/design được chủ pipeline poster áp dụng cho những format khác. Đây là tác động tổ chức cụ thể, dù chưa có quality metric. Cho adoption đủ diện tích thay vì cố dựng fake benchmark.

**Không đánh tráo:** public gallery template ≠ Huy-authored output; download/rating của app ≠ personal impact; generated illustration ≠ product screenshot; concept slide ≠ conversion demo; four-camera POC ≠ 500-camera deployment.

**Evidence gaps còn lại:**

- Creative: reference/input/output cùng điều kiện được phép public; evaluation rubric; implementation/research boundaries sâu hơn.
- Daily: public image trực tiếp feature còn thiếu trong bộ screenshot App Store đã xem; official notes có feature nhưng không xác nhận ownership cá nhân.
- Slide: public-safe demo, output format/layer support/quality chưa được xác nhận.
- Legacy metrics có trong archive nhưng thiếu điều kiện: NextSight <100ms, >95%, 5s→<1s; CrystalSound <200ms. Không khôi phục thành trophy metrics nếu chưa có ngữ cảnh.
- Personal experiments ngoài những concept mới tạo: cần artifact và ý đồ cụ thể nếu muốn nói là study đã thực hiện.

Không cần chờ hết gaps để làm concept tốt. Có thể làm website thuyết phục ngay bằng quyết định kỹ thuật rõ, provenance đúng và bằng chứng đang có. Sau cùng, comprehension review cần hỏi người xem nhớ Huy làm gì, đã đóng góp gì và đâu là proof; điểm Lighthouse không trả lời ba câu đó.
