<!--
id: blast
level: 2
tags: [bioinformatics, sequence_analysis, blast]
required_terms: [BLAST, アライメント, シークエンス, FASTA, FASTQ, バイオインフォマティクス, ペアワイズ, マルチプル, BLASTN, BLASTP]
-->

# BLAST

**難易度：★★☆（応用）**

---

## 📝 問題

BLASTについて説明しなさい。その原理、アライメントの概念、入力データ形式、代表的な種類について述べなさい。なお、以下の語句を必ず1回は使うこと。評価基準として、単に用語を使ったのみでは加点せず、誤っている説明は減点し、正しい説明は加点する。20点満点。

（指定語句）  
BLAST／アライメント／シークエンス／FASTA／FASTQ／バイオインフォマティクス／ペアワイズ／マルチプル／BLASTN／BLASTP

---

## 💡 ヒント（任意）

- BLASTは「何を何と比べる」ものか
- アライメントの意味
- 入力形式の違い

---

<details>
<summary>✅ 模範解答を見る</summary>

**BLAST**（Basic Local Alignment Search Tool）は、あるDNAやタンパク質の**シークエンス**をデータベース中の配列と比較し、類似配列を検索するための代表的な**バイオインフォマティクス**ツールである。

BLASTは配列間の局所的な**アライメント**を行うことで、高速に類似領域を検出する。これは主に**ペアワイズ**アライメントの手法に基づいており、二つの配列間の一致度を評価する。複数配列を同時に整列する方法は**マルチプル**アライメントと呼ばれるが、これはBLASTそのものではなく別の解析法である。

入力データ形式としては、塩基配列のみを含む**FASTA**形式や、配列と品質情報を含む**FASTQ**形式がある。

BLASTには用途に応じた種類があり、DNA配列同士を比較する**BLASTN**や、アミノ酸配列を比較する**BLASTP**などが代表的である。

このようにBLASTは、未知配列の機能推定や種同定などに広く利用される基本的な配列解析ツールである。

</details>

---

<details>
<summary>📊 採点基準を見る</summary>

### Ⅰ．定義（4点）

- 類似配列検索ツールと説明（4点）

### Ⅱ．アライメント概念（4点）

- 局所アライメントの説明（2点）
- ペアワイズとの関連（2点）

### Ⅲ．入力形式（4点）

- FASTAの説明（2点）
- FASTQの説明（2点）

### Ⅳ．種類（4点）

- BLASTNの説明（2点）
- BLASTPの説明（2点）

### Ⅴ．論理性・正確性（4点）

</details>

---

<details>
<summary>❌ 減点例を見る</summary>

- BLASTがマルチプルアライメントと記載（−3点）
- FASTQに品質情報がないと記載（−2点）
- BLASTNがタンパク質検索と記載（−3点）
- 用語のみ羅列（加点なし）

</details>

---

## 🚀 発展

- E-valueの意味
- グローバルアライメントとの違い
- メタゲノムデータ解析への応用

---

## 🔗 参考リンク

- NCBI BLAST公式  
  https://blast.ncbi.nlm.nih.gov/Blast.cgi

- NCBI FASTA format documentation  
  https://www.ncbi.nlm.nih.gov/genbank/fastaformat/

- EMBL-EBI BLAST  
  https://www.ebi.ac.uk/Tools/sss/ncbiblast/
