# Ex-Aid: nguồn cảm hứng chọn card → chuyển thành hero

Kiểm chứng ngày **02/10/2026**. Nghiên cứu có giới hạn, không tải video, không vượt chặn domain/login.

## Nguồn và access

- [YouTube search đã thử](https://www.youtube.com/results?search_query=kamen+rider+ex+aid+henshin+character+selection): browser HTTP **403**, nội dung **“Domain forbidden”**. Không có kết quả hay footage quan sát được. [Capture lỗi](ex-aid-youtube-search.png).
- [Toei / Kamen Rider official guide](https://www.kamen-rider-official.com/columns/wiki/2035/): browser HTTP **200**. Bài guide công khai, ngày bài 17/12/2021; có gallery nhãn episode 01/02, key art, characters và mô tả các cảnh biến hình. [Capture nguyên trang](ex-aid-official.png), [text trích từ DOM](ex-aid-official.txt).
- Không xác minh được video playback, nhịp frame, easing, camera angle hay timestamp. Không có link timestamp đã kiểm chứng để cung cấp.

## Bằng chứng chính thức sát với điều Huy mô tả

Mục **「仮面ライダーエグゼイドの変身シーン」 → 「1.アクションゲーマー レベル1」** viết:

> 永夢の周囲をキャラクターセレクトのような各ライダーの映像が周り、エグゼイドをselectすることで、アクションゲーマー レベル1に変身。

Dịch sát ý: **Hình ảnh các Rider xoay quanh Emu giống một màn chọn nhân vật; khi chọn Ex-Aid, anh biến thành Action Gamer Level 1.**

Đoạn trước đó tả chữ **GAME START**, hình game phía sau và game area mở rộng. Đoạn Level 2 sau đó tả một **screen mang hình Level 2 xuất hiện rồi bao lấy Level 1**.

Điều này xác nhận **motif orbit → selection → transformation** người dùng nhớ là có trong mô tả chính thức. Nó không cho phép khẳng định card hình chữ nhật, số lượng card, hướng xoay, tốc độ, crop hoặc thời lượng cụ thể của footage. Những chi tiết đó phải là quyết định thiết kế mới hoặc cần video quan sát bổ sung.

## Chuyển ngữ thành motion portfolio — đề xuất thiết kế, không phải mô tả footage đã xem

1. **Establish:** identity Huy và một promise đọc được ngay; 3 project artifacts nằm ở các độ sâu khác nhau, có đường orbit tinh tế.
2. **Orbit:** scroll đẩy một cung chuyển động ngắn; card giữ mặt đủ dễ đọc, chỉ card chưa được focus mới nghiêng nhiều. Không bắt khách hover/click để nhìn thấy 3 nhóm năng lực.
3. **Select:** card Creative dẫn đầu tiến về mặt phẳng chính, các card còn lại thu về hai cạnh; một moment dừng đủ để đọc title + đóng góp cá nhân.
4. **Transform:** cùng artifact/phần tử mở rộng thành composition case study; text contextual xuất hiện theo bố cục đã ổn định. Chuyển cảnh phải giữ continuity hình, không cắt sang một artwork khác không liên quan.
5. **Explain:** visual DNA/reference-to-guideline sequence dùng một subject/design-system xuyên suốt; câu credit của Huy xuất hiện trong scene, không giấu sau click.
6. **Resolve:** đưa người xem về native scroll và case summary. Mobile rút orbit còn ít depth; reduced-motion hiển thị static overview + case sequence.

Không cần dùng hình/nhạc/nhân vật Ex-Aid trên website. Nguồn cảm hứng là cách **nhiều khả năng hội tụ thành một năng lực nổi bật**. Thời lượng, scroll distance, transform matrix và motion design cần được review bằng prototype thực tế, không coi static storyboard là chứng minh motion đã tốt.

## Evidence artifacts

- `ex-aid-access.json`: status/title/body và video count từ browser.
- `ex-aid-official-links.json`: các link thấy trên trang, gồm official YouTube channels.
- `ex-aid-official.txt`: đủ đoạn transformation cho Ex-Aid, Brave và Snipe.
- `ex-aid-official.png`: browser screenshot cả trang.
- `ex-aid-youtube-search.png`: lỗi domain forbidden được giữ nguyên.


## User-supplied clip in this session

Huy subsequently attached `YTSave_YouTube_Media_AGuEoOnp0f0_Kamen-Rider-Ex-Aid-Brave-Lazer-Gamer_001_720p.mp4`. The workspace download tool rejected the transfer because the attachment exceeds32MiB. No frames or timing from that file have been inspected yet. A proposed Higgsfield attachment transfer was rejected by automatic approval review for missing explicit authorization to send this file to that external service. Huy then reported that Higgsfield has no processing quota, so that route is not being used. A local clip under32MiB containing the relevant transformation is needed for direct frame review. The official written description above remains valid; exact choreography is still a proposal, not observed footage.
